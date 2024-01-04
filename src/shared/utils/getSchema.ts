import {
  IntrospectionField,
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
  IntrospectionType,
  getIntrospectionQuery,
} from 'graphql';

export interface SchemaType {
  name: string;
  fields: FieldType[];
  description: string;
}

export type TypeDetails = {
  name: string;
  list: boolean;
  nonNull: boolean;
};

export interface FieldType {
  name: string;
  args?: ArgType[];
  type: TypeDetails;
  description?: string;
  fields?: FieldType[];
}

export interface ArgType {
  name: string;
  type: TypeDetails;
}

// const fieldsType = (field: IntrospectionField | IntrospectionInputValue) => {
//   if (
//     field.type.kind === 'OBJECT' ||
//     field.type.kind === 'SCALAR' ||
//     field.type.kind === 'INPUT_OBJECT'
//   ) {
//     return {
//       name: field.type.name,
//       list: false,
//       nonNull: false,
//     };
//   }

//   if (field.type.kind === 'LIST') {
//     if (field.type.ofType.kind === 'OBJECT') {
//       return {
//         name: field.type.ofType.name,
//         list: true,
//         nonNull: false,
//       };
//     }
//   }

//   if (field.type.kind === 'NON_NULL') {
//     if (field.type.ofType.kind === 'OBJECT' || field.type.ofType.kind === 'SCALAR') {
//       return {
//         name: field.type.ofType.name,
//         list: false,
//         nonNull: true,
//       };
//     }
//   }

//   if (field.type.kind === 'NON_NULL') {
//     if (field.type.ofType.kind === 'LIST') {
//       if (
//         field.type.ofType.ofType.kind === 'OBJECT' ||
//         field.type.ofType.ofType.kind === 'SCALAR'
//       ) {
//         return {
//           name: field.type.ofType.ofType.name,
//           list: true,
//           nonNull: true,
//         };
//       }
//     }
//   }

//   if (field.type.kind === 'NON_NULL') {
//     if (field.type.ofType.kind === 'LIST') {
//       if (field.type.ofType.ofType.kind === 'NON_NULL') {
//         if (
//           field.type.ofType.ofType.ofType.kind === 'OBJECT' ||
//           field.type.ofType.ofType.ofType.kind === 'SCALAR'
//         )
//           return {
//             name: field.type.ofType.ofType.ofType.name,
//             list: true,
//             nonNull: true,
//           };
//       }
//     }
//   }

//   return {
//     name: '',
//     list: false,
//     nonNull: false,
//   };
// };

const fieldsType = (field: IntrospectionField | IntrospectionInputValue) => {
  const getTypeDetails = (
    type: IntrospectionOutputTypeRef | IntrospectionInputTypeRef,
  ): TypeDetails => {
    if (!type) {
      return { name: '', list: false, nonNull: false };
    }

    switch (type.kind) {
      case 'OBJECT':
      case 'SCALAR':
      case 'INPUT_OBJECT':
        return { name: type.name, list: false, nonNull: false };
      case 'LIST':
        return { ...getTypeDetails(type.ofType), list: true };
      case 'NON_NULL':
        return { ...getTypeDetails(type.ofType), nonNull: true };
      default:
        return { name: '', list: false, nonNull: false };
    }
  };

  return getTypeDetails(field.type);
};

const argsType = (field: IntrospectionField) => {
  return field.args.map((arg) => {
    return {
      name: arg.name,
      type: fieldsType(arg),
    };
  });
};

const getType = (type: IntrospectionType) => {
  if (type.kind === 'OBJECT') {
    return type.fields.map((field) => ({
      name: field.name,
      args: argsType(field),
      type: fieldsType(field),
      description: field.description || '',
    }));
  }

  if (type.kind === 'INPUT_OBJECT') {
    return type.inputFields.map((field) => ({
      name: field.name,
      type: fieldsType(field),
      description: field.description || '',
    }));
  }

  return [];
};

export const getSchema = async (url: string) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'IntrospectionQuery',
      query: getIntrospectionQuery(),
    }),
  });

  const { data }: { data: IntrospectionQuery } = await result.json();
  console.log('data', data);

  const exclude = data.__schema.types.filter((type) => {
    return !type.name.startsWith('__');
  });

  console.log('exclude', exclude);

  const schemaTypes: SchemaType[] = exclude.map((type) => ({
    name: type.name,
    description: type.description || '',
    fields: getType(type),
  }));

  console.log('shematypes:', schemaTypes);

  return schemaTypes;
};

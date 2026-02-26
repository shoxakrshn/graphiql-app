import {
  IntrospectionField,
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
  IntrospectionType,
  getIntrospectionQuery,
} from 'graphql';

export type SchemaType = {
  name: string;
  fields: FieldType[];
  description: string;
};

export type TypeDetails = {
  name: string;
  list: boolean;
  nonNull: boolean;
};

export type FieldType = {
  name: string;
  args?: ArgType[];
  type: TypeDetails;
  description?: string;
  fields?: FieldType[];
};

export type ArgType = {
  name: string;
  type: TypeDetails;
};

const getFieldsType = (field: IntrospectionField | IntrospectionInputValue) => {
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

const getArgsType = (field: IntrospectionField) => {
  return field.args.map((arg) => {
    return {
      name: arg.name,
      type: getFieldsType(arg),
    };
  });
};

const getTypes = (type: IntrospectionType) => {
  if (type.kind === 'OBJECT') {
    return type.fields.map((field) => ({
      name: field.name,
      args: getArgsType(field),
      type: getFieldsType(field),
      description: field.description || '',
    }));
  }

  if (type.kind === 'INPUT_OBJECT') {
    return type.inputFields.map((field) => ({
      name: field.name,
      type: getFieldsType(field),
      description: field.description || '',
    }));
  }

  return [];
};

export const getSchema = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operationName: 'IntrospectionQuery',
        query: getIntrospectionQuery(),
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    const { data }: { data: IntrospectionQuery } = await response.json();

    const schemaTypes = data.__schema.types
      .filter((type) => !type.name.startsWith('__') && type.kind !== 'ENUM')
      .map((type) => ({
        name: type.name,
        description: type.description || '',
        fields: getTypes(type),
      }));

    return schemaTypes;
  } catch {
    throw new Error('Error fetching schema');
  }
};

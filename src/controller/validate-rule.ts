import { Request, Response } from 'express';
import get from 'lodash/get';

enum Conditions {
  eq = 'eq', //  Means the field value should be equal to the condition value
  neq = 'neq', //  Means the field value should not be equal to the condition value
  gt = 'gt', //  Means the field value should be greater than the condition value
  gte = 'gte', //  Means the field value should be greater than or equal to the condition
  contains = 'contains', //  Means the field value should contain the condition value
}

type ConditionType = 'eq' | 'neq' | 'gt' | 'gte' | 'contains';
const predictCondition = (
  value: string,
  condition_value: string | number,
  condition: ConditionType
): boolean => {
  switch (condition) {
    case Conditions.eq:
      return value === condition_value;
    case Conditions.gte:
      return value >= condition_value;
    case Conditions.neq:
      return value !== condition_value;
    case Conditions.gt:
      return value > condition_value;
    case Conditions.contains:
      return value.includes(`${condition_value}`);
  }
  return false;
};

const validateRule = (req: Request, res: Response): Response => {
  const {
    rule: { field, condition, condition_value },
    data,
  } = req.body;
  const fieldValue = get(data, field);
  const isValid = predictCondition(fieldValue, condition_value, condition);

  return res.status(200).send({
    message: `field ${field} ${
      isValid ? 'successfully validated' : 'failed validation'
    }.`,
    status: isValid ? 'success' : 'error',
    data: {
      validation: {
        error: !isValid,
        field,
        field_value: fieldValue,
        condition,
        condition_value,
      },
    },
  });
};

export default validateRule;

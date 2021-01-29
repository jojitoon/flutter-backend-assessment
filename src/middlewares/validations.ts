import { body } from 'express-validator';
import { isObject } from '../helpers/isObj';
import has from 'lodash/has';

const isRequiredMessage = (field: string) => `${field} is required.`;
const isOfTypeMessage = (field: string, type: string, adj = 'an') =>
  `${field} should be ${adj} ${type}.`;
const missingField = (field: string, parent: string) =>
  `field ${field} is missing from ${parent}.`;

export default [
  body('rule')
    .exists()
    .withMessage(isRequiredMessage('rule'))
    .custom(
      (value) => value && typeof value === 'object' && !Array.isArray(value)
    )
    .withMessage(isOfTypeMessage('rule', 'object')),
  body('rule.field').exists().withMessage(isRequiredMessage('rule.field')),
  body('rule.condition')
    .exists()
    .withMessage(isRequiredMessage('rule.condition'))
    .isIn(['eq', 'neq', 'gt', 'gte', 'contains'])
    .withMessage(
      isOfTypeMessage(
        'rule.condition',
        "'eq', 'neq', 'gt', 'gte', 'contains'",
        'one of'
      )
    ),
  body('rule.condition_value')
    .exists()
    .withMessage(isRequiredMessage('rule.condition_value')),
  body('data')
    .exists()
    .withMessage(isRequiredMessage('data'))
    .custom((value) => {
      const isValid =
        value &&
        (typeof value === 'string' || isObject(value) || Array.isArray(value));

      return isValid;
    })
    .withMessage(
      isOfTypeMessage('data', 'string or an object or an array', 'a')
    ),
  body('rule.field')
    .custom((value, { req }) => has(req.body.data, value))
    .withMessage((value) => missingField(value, 'data')),
];

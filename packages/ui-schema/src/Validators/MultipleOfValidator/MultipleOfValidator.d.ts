import { OrderedMap } from 'immutable'
import { ValidatorPlugin } from "@ui-schema/ui-schema/Validators"
import { EditorPluginProps } from "@ui-schema/ui-schema/EditorPlugin"
import { errors } from "@ui-schema/ui-schema/CommonTypings"

export const ERROR_MULTIPLE_OF = 'multiple-of'

export function validateMultipleOf(schema: OrderedMap<{}, undefined>, value: any): boolean

export interface MultipleOfValidatorType extends ValidatorPlugin {
    validate: (
        {schema, value, errors, valid}: Partial<EditorPluginProps>
    ) => {
        errors: errors
        valid: boolean
    }
}

export const multipleOfValidator: MultipleOfValidatorType

import { EditorPluginProps } from "@ui-schema/ui-schema/EditorPlugin"
import { ValidatorPlugin } from "@ui-schema/ui-schema/Validators"
import { errors } from "@ui-schema/ui-schema/CommonTypings"

export const ERROR_NOT_SET = 'required-not-set'

/**
 *
 * @param type
 * @param value
 *
 * @return boolean false when value does not exist per definition for this type, it still may be empty another way
 */
export function checkValueExists(type: string, value: any): boolean

export interface RequiredValidatorType extends ValidatorPlugin {
    should: ({requiredList, ownKey}: Partial<EditorPluginProps>) => boolean
    validate: (
        {schema, value, errors, valid}: Partial<EditorPluginProps>
    ) => {
        errors: errors
        valid: boolean
        required: true
    }
    noValidate: () => { required: false }
}

export const requiredValidator: RequiredValidatorType

import {
  MarkdownRootSchema,
  ValidateEventDescriptionResultSchema,
  ValidateEventTitleResultSchema,
  ValidateTagAliasResultSchema,
  ValidateTagNameResultSchema,
  ValidateUserDisplayNameResultSchema,
  ValidateUserLoginResultSchema,
  ValidateUserPasswordResultSchema,
} from '@/gen/evops/ext/v1/ext_pb.ts'
import {
  fromBinary,
  type DescMessage,
  type MessageShape,
} from '@bufbuild/protobuf'
import { createPlugin, type ManifestLike, type Plugin } from '@extism/extism'

export interface ApiExt {
  getEventDescriptionLenCharMax: ExtismFnJs<number>
  getEventDescriptionLenCharMin: ExtismFnJs<number>
  getEventTitleLenCharMax: ExtismFnJs<number>
  getEventTitleLenCharMin: ExtismFnJs<number>
  getTagAliasLenCharMax: ExtismFnJs<number>
  getTagAliasLenCharMin: ExtismFnJs<number>
  getTagNameLenCharMax: ExtismFnJs<number>
  getTagNameLenCharMin: ExtismFnJs<number>
  getTagNameRegex: ExtismFnJs<string>
  getUserDisplayNameLenCharMax: ExtismFnJs<number>
  getUserDisplayNameLenCharMin: ExtismFnJs<number>
  getUserLoginLenCharMax: ExtismFnJs<number>
  getUserLoginLenCharMin: ExtismFnJs<number>
  getUserLoginRegex: ExtismFnJs<string>
  getUserPasswordLenCharMax: ExtismFnJs<number>
  getUserPasswordLenCharMin: ExtismFnJs<number>
  getUserPasswordRegex: ExtismFnJs<string>
  parseMarkdown: ExtismFnJsPb<string, typeof MarkdownRootSchema>
  validateEventDescription: ExtismFnJsPb<
    string,
    typeof ValidateEventDescriptionResultSchema
  >
  validateEventTitle: ExtismFnJsPb<
    string,
    typeof ValidateEventTitleResultSchema
  >
  validateTagAlias: ExtismFnJsPb<string, typeof ValidateTagAliasResultSchema>
  validateTagName: ExtismFnJsPb<string, typeof ValidateTagNameResultSchema>
  validateUserDisplayName: ExtismFnJsPb<
    string,
    typeof ValidateUserDisplayNameResultSchema
  >
  validateUserLogin: ExtismFnJsPb<string, typeof ValidateUserLoginResultSchema>
  validateUserPassword: ExtismFnJsPb<
    string,
    typeof ValidateUserPasswordResultSchema
  >
}

export async function initApiExt(
  pluginManifest: ManifestLike,
): Promise<ApiExt> {
  const extismPlugin = await createPlugin(pluginManifest)
  return {
    getEventDescriptionLenCharMax: extismFnJs(
      extismPlugin,
      'get_event_description_len_char_max',
    ),
    getEventDescriptionLenCharMin: extismFnJs(
      extismPlugin,
      'get_event_description_len_char_min',
    ),
    getEventTitleLenCharMax: extismFnJs(
      extismPlugin,
      'get_event_title_len_char_max',
    ),
    getEventTitleLenCharMin: extismFnJs(
      extismPlugin,
      'get_event_title_len_char_min',
    ),
    getTagAliasLenCharMax: extismFnJs(
      extismPlugin,
      'get_tag_alias_len_char_max',
    ),
    getTagAliasLenCharMin: extismFnJs(
      extismPlugin,
      'get_tag_alias_len_char_min',
    ),
    getTagNameLenCharMax: extismFnJs(extismPlugin, 'get_tag_name_len_char_max'),
    getTagNameLenCharMin: extismFnJs(extismPlugin, 'get_tag_name_len_char_min'),
    getTagNameRegex: extismFnJs(extismPlugin, 'get_tag_name_regex'),
    getUserDisplayNameLenCharMax: extismFnJs(
      extismPlugin,
      'get_user_display_name_len_char_max',
    ),
    getUserDisplayNameLenCharMin: extismFnJs(
      extismPlugin,
      'get_user_display_name_len_char_min',
    ),
    getUserLoginLenCharMax: extismFnJs(
      extismPlugin,
      'get_user_login_len_char_max',
    ),
    getUserLoginLenCharMin: extismFnJs(
      extismPlugin,
      'get_user_login_len_char_min',
    ),
    getUserLoginRegex: extismFnJs(extismPlugin, 'get_user_login_regex'),
    getUserPasswordLenCharMax: extismFnJs(
      extismPlugin,
      'get_user_password_len_char_max',
    ),
    getUserPasswordLenCharMin: extismFnJs(
      extismPlugin,
      'get_user_password_len_char_min',
    ),
    getUserPasswordRegex: extismFnJs(extismPlugin, 'get_user_password_regex'),
    parseMarkdown: extismFnJsPb(
      extismPlugin,
      'parse_markdown',
      MarkdownRootSchema,
    ),
    validateEventDescription: extismFnJsPb(
      extismPlugin,
      'validate_event_description',
      ValidateEventDescriptionResultSchema,
    ),

    validateEventTitle: extismFnJsPb(
      extismPlugin,
      'validate_event_title',
      ValidateEventTitleResultSchema,
    ),
    validateTagAlias: extismFnJsPb(
      extismPlugin,
      'validate_tag_alias',
      ValidateTagAliasResultSchema,
    ),
    validateTagName: extismFnJsPb(
      extismPlugin,
      'validate_tag_name',
      ValidateTagNameResultSchema,
    ),
    validateUserDisplayName: extismFnJsPb(
      extismPlugin,
      'validate_user_display_name',
      ValidateUserDisplayNameResultSchema,
    ),
    validateUserLogin: extismFnJsPb(
      extismPlugin,
      'validate_user_login',
      ValidateUserLoginResultSchema,
    ),
    validateUserPassword: extismFnJsPb(
      extismPlugin,
      'validate_user_password',
      ValidateUserPasswordResultSchema,
    ),
  }
}

export type ExtismFnJs<Response> = () => Promise<Response>

function extismFnJs<Response extends string | number | Uint8Array>(
  plugin: Plugin,
  functionName: string,
): ExtismFnJs<Response> {
  return async () =>
    await plugin
      .call(functionName)
      .then((pluginOutput) => pluginOutput!.json()! as Response)
}

export type ExtismFnJsPb<Request, Response extends DescMessage> = (
  request: Request,
) => Promise<MessageShape<Response>>

function extismFnJsPb<
  Request extends string | number | Uint8Array,
  Response extends DescMessage,
>(
  plugin: Plugin,
  functionName: string,
  outputSchema: Response,
): ExtismFnJsPb<Request, Response> {
  return async (request) =>
    await plugin
      .call(functionName, request)
      .then((pluginOutput) => fromBinary(outputSchema, pluginOutput!.bytes()))
}

// export type ExtismFnPbPb<
//   Request extends DescMessage,
//   Response extends DescMessage,
// > = (request: MessageInitShape<Request>) => Promise<MessageShape<Response>>

// function extismFnPbPb<
//   Request extends DescMessage,
//   Response extends DescMessage,
// >(
//   plugin: Plugin,
//   functionName: string,
//   inputSchema: Request,
//   outputSchema: Response,
// ): ExtismFnPbPb<Request, Response> {
//   return async (request) =>
//     await plugin
//       .call(functionName, toBinary(inputSchema, create(inputSchema, request)))
//       .then((pluginOutput) => fromBinary(outputSchema, pluginOutput!.bytes()))
// }

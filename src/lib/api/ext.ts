import {
  MarkdownRootSchema,
  ValidateEventDescriptionResultSchema,
  ValidateEventTitleResultSchema,
  ValidateTagAliasResultSchema,
  ValidateTagNameResultSchema,
  ValidateUserNameResultSchema,
} from '@/gen/evops/ext/v1/ext_pb.ts'
import {
  fromBinary,
  type DescMessage,
  type MessageShape,
} from '@bufbuild/protobuf'
import { createPlugin, type ManifestLike, type Plugin } from '@extism/extism'

export interface ApiExt {
  parseMarkdown: ExtismFnJsPb<string, typeof MarkdownRootSchema>
  validateUserName: ExtismFnJsPb<string, typeof ValidateUserNameResultSchema>
  validateEventTitle: ExtismFnJsPb<
    string,
    typeof ValidateEventTitleResultSchema
  >
  validateEventDescription: ExtismFnJsPb<
    string,
    typeof ValidateEventDescriptionResultSchema
  >
  validateTagName: ExtismFnJsPb<string, typeof ValidateTagNameResultSchema>
  validateTagAlias: ExtismFnJsPb<string, typeof ValidateTagAliasResultSchema>
  getUserNameMaxLen: ExtismFnJs<number>
  getEventTitleMaxLen: ExtismFnJs<number>
  getEventDescriptionMaxLen: ExtismFnJs<number>
  getTagNameMaxLen: ExtismFnJs<number>
  getTagNameRegex: ExtismFnJs<string>
  getTagAliasMaxLen: ExtismFnJs<string>
}

export async function initApiExt(
  pluginManifest: ManifestLike,
): Promise<ApiExt> {
  const extismPlugin = await createPlugin(pluginManifest)
  return {
    parseMarkdown: extismFnJsPb(
      extismPlugin,
      'parse_markdown',
      MarkdownRootSchema,
    ),
    validateUserName: extismFnJsPb(
      extismPlugin,
      'validate_user_name',
      ValidateUserNameResultSchema,
    ),
    validateEventTitle: extismFnJsPb(
      extismPlugin,
      'validate_event_title',
      ValidateEventTitleResultSchema,
    ),
    validateEventDescription: extismFnJsPb(
      extismPlugin,
      'validate_event_description',
      ValidateEventDescriptionResultSchema,
    ),
    validateTagName: extismFnJsPb(
      extismPlugin,
      'validate_tag_name',
      ValidateTagNameResultSchema,
    ),
    validateTagAlias: extismFnJsPb(
      extismPlugin,
      'validate_tag_alias',
      ValidateTagAliasResultSchema,
    ),
    getUserNameMaxLen: extismFnJs(extismPlugin, 'get_user_name_max_len'),
    getEventTitleMaxLen: extismFnJs(extismPlugin, 'get_event_title_max_len'),
    getEventDescriptionMaxLen: extismFnJs(
      extismPlugin,
      'get_event_description_max_len',
    ),
    getTagNameMaxLen: extismFnJs(extismPlugin, 'get_tag_name_max_len'),
    getTagNameRegex: extismFnJs(extismPlugin, 'get_tag_name_regex'),
    getTagAliasMaxLen: extismFnJs(extismPlugin, 'get_tag_alias_max_len'),
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

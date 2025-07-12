#![allow(clippy::unnecessary_wraps)]

use extism_pdk::{FnResult, Prost};

use evops_pb_ext::{
    MarkdownRoot, ValidateEventDescriptionResult, ValidateEventTitleResult, ValidateTagAliasResult,
    ValidateTagNameResult, ValidateUserNameResult,
};

#[extism_pdk::plugin_fn]
pub fn parse_markdown(text: String) -> FnResult<Prost<MarkdownRoot>> {
    Ok(Prost(evops_markdown::parse(&text).into()))
}

#[extism_pdk::plugin_fn]
pub fn validate_user_name(user_name: String) -> FnResult<Prost<ValidateUserNameResult>> {
    Ok(Prost(evops_models::UserName::try_new(user_name).into()))
}

#[extism_pdk::plugin_fn]
pub fn validate_event_title(event_title: String) -> FnResult<Prost<ValidateEventTitleResult>> {
    Ok(Prost(evops_models::EventTitle::try_new(event_title).into()))
}

#[extism_pdk::plugin_fn]
pub fn validate_event_description(
    event_description: String,
) -> FnResult<Prost<ValidateEventDescriptionResult>> {
    Ok(Prost({
        evops_models::EventDescription::try_new(event_description).into()
    }))
}

#[extism_pdk::plugin_fn]
pub fn validate_tag_name(tag_name: String) -> FnResult<Prost<ValidateTagNameResult>> {
    Ok(Prost(evops_models::TagName::try_new(tag_name).into()))
}

#[extism_pdk::plugin_fn]
pub fn validate_tag_alias(tag_alias: String) -> FnResult<Prost<ValidateTagAliasResult>> {
    Ok(Prost(evops_models::TagAlias::try_new(tag_alias).into()))
}

#[extism_pdk::plugin_fn]
pub fn get_user_name_max_len() -> FnResult<u32> {
    Ok(evops_models::USER_NAME_MAX_LEN.try_into().unwrap())
}

#[extism_pdk::plugin_fn]
pub fn get_event_title_max_len() -> FnResult<u32> {
    Ok(evops_models::EVENT_TITLE_MAX_LEN.try_into().unwrap())
}

#[extism_pdk::plugin_fn]
pub fn get_event_description_max_len() -> FnResult<u32> {
    Ok(evops_models::EVENT_DESCRIPTION_MAX_LEN.try_into().unwrap())
}

#[extism_pdk::plugin_fn]
pub fn get_tag_name_max_len() -> FnResult<u32> {
    Ok(evops_models::TAG_NAME_MAX_LEN.try_into().unwrap())
}

#[extism_pdk::plugin_fn]
pub fn get_tag_name_regex() -> FnResult<String> {
    Ok(evops_models::TAG_NAME_REGEX.to_string())
}

#[extism_pdk::plugin_fn]
pub fn get_tag_alias_max_len() -> FnResult<u32> {
    Ok(evops_models::TAG_ALIAS_MAX_LEN.try_into().unwrap())
}

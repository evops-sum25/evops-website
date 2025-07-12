mod conversions;

uniffi::setup_scaffolding!();

#[uniffi::export]
fn parse_markdown(text: &str) -> evops_markdown::ast::MarkdownRoot {
    evops_markdown::parse(text)
}

#[derive(uniffi::Enum)]
enum ValidateUserNameResult {
    Ok,
    LenCharMaxViolated,
    NotEmptyViolated,
}
#[uniffi::export]
fn validate_user_name(user_name: &str) -> self::ValidateUserNameResult {
    evops_models::UserName::try_new(user_name).into()
}

#[derive(uniffi::Enum)]
enum ValidateEventTitleResult {
    Ok,
    LenCharMaxViolated,
    NotEmptyViolated,
}
#[uniffi::export]
fn validate_event_title(event_title: &str) -> self::ValidateEventTitleResult {
    evops_models::EventTitle::try_new(event_title).into()
}

#[derive(uniffi::Enum)]
enum ValidateEventDescriptionResult {
    Ok,
    LenCharMaxViolated,
    NotEmptyViolated,
}
#[uniffi::export]
fn validate_event_description(event_description: &str) -> self::ValidateEventDescriptionResult {
    evops_models::EventDescription::try_new(event_description).into()
}

#[derive(uniffi::Enum)]
enum ValidateTagNameResult {
    Ok,
    LenCharMaxViolated,
    NotEmptyViolated,
    RegexViolated,
}
#[uniffi::export]
fn validate_tag_name(tag_name: &str) -> ValidateTagNameResult {
    evops_models::TagName::try_new(tag_name).into()
}

#[derive(uniffi::Enum)]
enum ValidateTagAliasResult {
    Ok,
    LenCharMaxViolated,
    NotEmptyViolated,
}
#[uniffi::export]
fn validate_tag_alias(tag_alias: &str) -> ValidateTagAliasResult {
    evops_models::TagAlias::try_new(tag_alias).into()
}

#[uniffi::export]
fn get_user_name_max_len() -> u8 {
    evops_models::USER_NAME_MAX_LEN.try_into().unwrap()
}

#[uniffi::export]
fn get_event_title_max_len() -> u8 {
    evops_models::EVENT_TITLE_MAX_LEN.try_into().unwrap()
}

#[uniffi::export]
fn get_event_description_max_len() -> u16 {
    evops_models::EVENT_DESCRIPTION_MAX_LEN.try_into().unwrap()
}

#[uniffi::export]
fn get_tag_name_max_len() -> u8 {
    evops_models::TAG_NAME_MAX_LEN.try_into().unwrap()
}

#[uniffi::export]
fn get_tag_name_regex() -> String {
    evops_models::TAG_NAME_REGEX.to_string()
}

#[uniffi::export]
fn get_tag_alias_max_len() -> u8 {
    evops_models::TAG_ALIAS_MAX_LEN.try_into().unwrap()
}

use thiserror::Error;

use crate::unist::MarkdownPosition;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownCode {
    pub value: String,
    pub position: MarkdownPosition,
    pub lang: Option<String>,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::Code> for MarkdownCode {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Code) -> Result<Self, Self::Error> {
        // todo: figure out what value.meta is

        Ok(Self {
            value: value.value,
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
            lang: value.lang,
        })
    }
}

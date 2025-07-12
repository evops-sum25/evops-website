use thiserror::Error;

use crate::unist::MarkdownPosition;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownInlineCode {
    pub value: String,
    pub position: MarkdownPosition,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::InlineCode> for MarkdownInlineCode {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::InlineCode) -> Result<Self, Self::Error> {
        Ok(Self {
            value: value.value,
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
        })
    }
}

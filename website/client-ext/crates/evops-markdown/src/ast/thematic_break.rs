use thiserror::Error;

use crate::unist::MarkdownPosition;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownThematicBreak {
    pub position: MarkdownPosition,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::ThematicBreak> for MarkdownThematicBreak {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::ThematicBreak) -> Result<Self, Self::Error> {
        Ok(Self {
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
        })
    }
}

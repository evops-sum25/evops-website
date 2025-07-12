use thiserror::Error;

use crate::ast::MarkdownParagraphChild;
use crate::unist::MarkdownPosition;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownDelete {
    pub children: Vec<MarkdownParagraphChild>,
    pub position: MarkdownPosition,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Child(#[from] Box<crate::ast::paragraph::child::ConvertError>),
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::Delete> for MarkdownDelete {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Delete) -> Result<Self, Self::Error> {
        Ok(Self {
            children: {
                value
                    .children
                    .into_iter()
                    .map(MarkdownParagraphChild::try_from)
                    .collect::<Result<Vec<_>, _>>()
                    .map_err(Box::new)?
            },
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
        })
    }
}

use thiserror::Error;

use self::depth::MarkdownHeadingDepth;
use crate::ast::MarkdownParagraphChild;
use crate::unist::MarkdownPosition;

pub mod depth;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownHeading {
    pub children: Vec<MarkdownParagraphChild>,
    pub position: MarkdownPosition,
    pub depth: MarkdownHeadingDepth,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Child(#[from] crate::ast::paragraph::child::ConvertError),
    #[error("todo")]
    InvalidDepth(#[from] self::depth::ConvertError),
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::Heading> for MarkdownHeading {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Heading) -> Result<Self, Self::Error> {
        Ok(Self {
            children: {
                value
                    .children
                    .into_iter()
                    .map(MarkdownParagraphChild::try_from)
                    .collect::<Result<Vec<_>, _>>()?
            },
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
            depth: value.depth.try_into()?,
        })
    }
}

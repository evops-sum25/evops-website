use thiserror::Error;

use self::child::MarkdownLinkChild;
use crate::unist::MarkdownPosition;

pub mod child;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownLink {
    pub children: Vec<MarkdownLinkChild>,
    pub position: MarkdownPosition,
    pub url: String,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Child(#[from] crate::ast::link::child::ConvertError),
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::Link> for MarkdownLink {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Link) -> Result<Self, Self::Error> {
        // todo: figure out what value.title is

        Ok(Self {
            children: {
                value
                    .children
                    .into_iter()
                    .map(MarkdownLinkChild::try_from)
                    .collect::<Result<Vec<_>, _>>()?
            },
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
            url: value.url,
        })
    }
}

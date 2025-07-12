use thiserror::Error;

use self::child::MarkdownRootChild;
use crate::unist::MarkdownPosition;

pub mod child;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownRoot {
    pub children: Vec<MarkdownRootChild>,
    pub position: MarkdownPosition,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Child(#[from] self::child::ConvertError),
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::Root> for MarkdownRoot {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Root) -> Result<Self, Self::Error> {
        Ok(Self {
            children: {
                value
                    .children
                    .into_iter()
                    .map(MarkdownRootChild::try_from)
                    .collect::<Result<_, _>>()?
            },
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
        })
    }
}

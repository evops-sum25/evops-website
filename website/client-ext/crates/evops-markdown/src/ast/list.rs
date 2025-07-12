use thiserror::Error;

use self::item::MarkdownListItem;
use crate::unist::MarkdownPosition;

pub mod item;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownList {
    pub children: Vec<MarkdownListItem>,
    pub position: MarkdownPosition,
    pub ordered: bool,
    pub spread: bool,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Item(#[from] self::item::ConvertError),
    #[error("todo")]
    NotItem(markdown::mdast::Node),
    #[error("todo")]
    NoPosition,
}

impl TryFrom<markdown::mdast::List> for MarkdownList {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::List) -> Result<Self, Self::Error> {
        Ok(Self {
            children: {
                value
                    .children
                    .into_iter()
                    .map(|node| -> Result<MarkdownListItem, Self::Error> {
                        if let markdown::mdast::Node::ListItem(li) = node {
                            Ok(MarkdownListItem::try_from(li)?)
                        } else {
                            Err(ConvertError::NotItem(node))
                        }
                    })
                    .collect::<Result<Vec<_>, _>>()?
            },
            position: value.position.ok_or(ConvertError::NoPosition)?.into(),
            ordered: value.ordered,
            spread: value.spread,
        })
    }
}

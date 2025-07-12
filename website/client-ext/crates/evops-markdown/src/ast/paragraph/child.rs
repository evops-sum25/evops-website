use thiserror::Error;

use crate::ast::{
    MarkdownDelete, MarkdownEmphasis, MarkdownInlineCode, MarkdownLink, MarkdownStrong,
    MarkdownText,
};

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Enum))]
pub enum MarkdownParagraphChild {
    Text(MarkdownText),
    Strong(MarkdownStrong),
    Emphasis(MarkdownEmphasis),
    Delete(MarkdownDelete),
    InlineCode(MarkdownInlineCode),
    Link(MarkdownLink),
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Text(#[from] crate::ast::text::ConvertError),
    #[error("todo")]
    Strong(#[from] crate::ast::strong::ConvertError),
    #[error("todo")]
    Emphasis(#[from] crate::ast::emphasis::ConvertError),
    #[error("todo")]
    Delete(#[from] crate::ast::delete::ConvertError),
    #[error("todo")]
    InlineCode(#[from] crate::ast::inline_code::ConvertError),
    #[error("todo")]
    Link(#[from] crate::ast::link::ConvertError),
    #[error("todo")]
    InvalidNode(markdown::mdast::Node),
}

impl TryFrom<markdown::mdast::Node> for MarkdownParagraphChild {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Node) -> Result<Self, Self::Error> {
        use markdown::mdast::Node as N;

        Ok(match value {
            N::Text(txt) => Self::Text(txt.try_into()?),
            N::Strong(s) => Self::Strong(s.try_into()?),
            N::Emphasis(em) => Self::Emphasis(em.try_into()?),
            N::Delete(del) => Self::Delete(del.try_into()?),
            N::InlineCode(ic) => Self::InlineCode(ic.try_into()?),
            N::Link(ln) => Self::Link(ln.try_into()?),
            _ => return Err(ConvertError::InvalidNode(value)),
        })
    }
}

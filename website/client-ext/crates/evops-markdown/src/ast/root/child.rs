use thiserror::Error;

use crate::ast::{
    MarkdownBlockquote, MarkdownCode, MarkdownHeading, MarkdownList, MarkdownParagraph,
    MarkdownThematicBreak,
};

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Enum))]
pub enum MarkdownRootChild {
    Paragraph(MarkdownParagraph),
    Heading(MarkdownHeading),
    List(MarkdownList),
    Blockquote(MarkdownBlockquote),
    Code(MarkdownCode),
    ThematicBreak(MarkdownThematicBreak),
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    Paragraph(#[from] crate::ast::paragraph::ConvertError),
    #[error("todo")]
    Heading(#[from] crate::ast::heading::ConvertError),
    #[error("todo")]
    List(#[from] crate::ast::list::ConvertError),
    #[error("todo")]
    Blockquote(#[from] crate::ast::blockquote::ConvertError),
    #[error("todo")]
    Code(#[from] crate::ast::code::ConvertError),
    #[error("todo")]
    ThematicBreak(#[from] crate::ast::thematic_break::ConvertError),
    #[error("todo")]
    InvalidNode(markdown::mdast::Node),
}

impl TryFrom<markdown::mdast::Node> for MarkdownRootChild {
    type Error = ConvertError;

    fn try_from(value: markdown::mdast::Node) -> Result<Self, Self::Error> {
        use markdown::mdast::Node as N;

        Ok(match value {
            N::Paragraph(p) => Self::Paragraph(p.try_into()?),
            N::Heading(h) => Self::Heading(h.try_into()?),
            N::List(ls) => Self::List(ls.try_into()?),
            N::Blockquote(bq) => Self::Blockquote(bq.try_into()?),
            N::Code(it) => Self::Code(it.try_into()?),
            N::ThematicBreak(tb) => Self::ThematicBreak(tb.try_into()?),
            _ => {
                return Err(ConvertError::InvalidNode(value));
            }
        })
    }
}

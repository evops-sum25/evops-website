#[cfg(feature = "uniffi")]
uniffi::setup_scaffolding!();

use markdown::{Constructs, ParseOptions};

use crate::ast::MarkdownRoot;

pub mod ast;
pub mod unist;

#[cfg(feature = "protobuf")]
mod pb_conversions;

/// # Panics
///
/// This function should never panic because Markdown does not have syntax errors.
#[must_use]
pub fn parse(text: &str) -> MarkdownRoot {
    let mdast = {
        markdown::to_mdast(text, &parse_options()).expect("CommonMark doesn't have syntax errors")
    };
    let markdown::mdast::Node::Root(root) = mdast else {
        unreachable!("when parsing entire documents, we should get a Root element");
    };

    MarkdownRoot::try_from(root)
        .expect("document parsed with ParseOptions::default should be CommonMark-compliant")
}

#[must_use]
#[inline]
pub fn parse_options() -> ParseOptions {
    ParseOptions {
        constructs: Constructs {
            definition: false,
            gfm_autolink_literal: true,
            gfm_strikethrough: true,
            html_flow: false,
            html_text: false,
            label_start_image: false,
            ..Default::default()
        },
        ..Default::default()
    }
}

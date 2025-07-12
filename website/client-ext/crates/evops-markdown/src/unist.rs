use std::fmt::{self, Debug, Formatter};

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
pub struct MarkdownCoordinate(pub usize);

impl From<MarkdownCoordinate> for u16 {
    fn from(value: MarkdownCoordinate) -> Self {
        value.0.try_into().expect("coordinate should fit in u16")
    }
}

impl From<u16> for MarkdownCoordinate {
    fn from(value: u16) -> Self {
        Self(value.into())
    }
}

#[cfg(feature = "uniffi")]
uniffi::custom_type!(MarkdownCoordinate, u16);

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownPoint {
    pub line: MarkdownCoordinate,
    pub column: MarkdownCoordinate,
    pub offset: MarkdownCoordinate,
}

impl From<markdown::unist::Point> for MarkdownPoint {
    fn from(value: markdown::unist::Point) -> Self {
        Self {
            line: MarkdownCoordinate(value.line),
            column: MarkdownCoordinate(value.column),
            offset: MarkdownCoordinate(value.offset),
        }
    }
}

#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Record))]
pub struct MarkdownPosition {
    pub start: MarkdownPoint,
    pub end: MarkdownPoint,
}

impl From<markdown::unist::Position> for MarkdownPosition {
    fn from(value: markdown::unist::Position) -> Self {
        Self {
            start: value.start.into(),
            end: value.end.into(),
        }
    }
}

impl Debug for MarkdownPosition {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}:{}-{}:{} ({}-{})",
            self.start.line.0,
            self.start.column.0,
            self.end.line.0,
            self.end.column.0,
            self.start.offset.0,
            self.end.offset.0,
        )
    }
}

use thiserror::Error;

#[derive(Debug)]
#[cfg_attr(feature = "schemars", derive(schemars::JsonSchema))]
#[cfg_attr(feature = "serde", derive(serde::Serialize))]
#[cfg_attr(feature = "uniffi", derive(uniffi::Enum))]
pub enum MarkdownHeadingDepth {
    MarkdownHeadingDepth1 = 1,
    MarkdownHeadingDepth2 = 2,
    MarkdownHeadingDepth3 = 3,
    MarkdownHeadingDepth4 = 4,
    MarkdownHeadingDepth5 = 5,
    MarkdownHeadingDepth6 = 6,
}

#[derive(Error, Debug)]
pub enum ConvertError {
    #[error("todo")]
    InvalidValue(u8),
}

impl TryFrom<u8> for MarkdownHeadingDepth {
    type Error = ConvertError;

    fn try_from(value: u8) -> Result<Self, Self::Error> {
        Ok(match value {
            1 => Self::MarkdownHeadingDepth1,
            2 => Self::MarkdownHeadingDepth2,
            3 => Self::MarkdownHeadingDepth3,
            4 => Self::MarkdownHeadingDepth4,
            5 => Self::MarkdownHeadingDepth5,
            6 => Self::MarkdownHeadingDepth6,
            _ => return Err(ConvertError::InvalidValue(value)),
        })
    }
}

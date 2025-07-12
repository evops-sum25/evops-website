impl<T> From<Result<T, evops_models::UserNameError>> for crate::ValidateUserNameResult {
    fn from(value: Result<T, evops_models::UserNameError>) -> Self {
        match value {
            Ok(_) => Self::Ok,
            Err(e) => {
                use evops_models::UserNameError as E;
                match e {
                    E::LenCharMaxViolated => Self::LenCharMaxViolated,
                    E::NotEmptyViolated => Self::NotEmptyViolated,
                }
            }
        }
    }
}

impl<T> From<Result<T, evops_models::EventTitleError>> for crate::ValidateEventTitleResult {
    fn from(value: Result<T, evops_models::EventTitleError>) -> Self {
        match value {
            Ok(_) => Self::Ok,
            Err(e) => {
                use evops_models::EventTitleError as E;
                match e {
                    E::LenCharMaxViolated => Self::LenCharMaxViolated,
                    E::NotEmptyViolated => Self::NotEmptyViolated,
                }
            }
        }
    }
}

impl<T> From<Result<T, evops_models::EventDescriptionError>>
    for crate::ValidateEventDescriptionResult
{
    fn from(value: Result<T, evops_models::EventDescriptionError>) -> Self {
        match value {
            Ok(_) => Self::Ok,
            Err(e) => {
                use evops_models::EventDescriptionError as E;
                match e {
                    E::LenCharMaxViolated => Self::LenCharMaxViolated,
                    E::NotEmptyViolated => Self::NotEmptyViolated,
                }
            }
        }
    }
}

impl<T> From<Result<T, evops_models::TagNameError>> for crate::ValidateTagNameResult {
    fn from(value: Result<T, evops_models::TagNameError>) -> Self {
        match value {
            Ok(_) => Self::Ok,
            Err(e) => {
                use evops_models::TagNameError as E;
                match e {
                    E::LenCharMaxViolated => Self::LenCharMaxViolated,
                    E::NotEmptyViolated => Self::NotEmptyViolated,
                    E::RegexViolated => Self::RegexViolated,
                }
            }
        }
    }
}

impl<T> From<Result<T, evops_models::TagAliasError>> for crate::ValidateTagAliasResult {
    fn from(value: Result<T, evops_models::TagAliasError>) -> Self {
        use evops_models::TagAliasError as N;

        match value {
            Ok(_) => Self::Ok,
            Err(e) => match e {
                N::LenCharMaxViolated => Self::LenCharMaxViolated,
                N::NotEmptyViolated => Self::NotEmptyViolated,
            },
        }
    }
}

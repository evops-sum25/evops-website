impl<T> From<Result<T, evops_models::UserNameError>> for crate::ValidateUserNameResult {
    fn from(value: Result<T, evops_models::UserNameError>) -> Self {
        use crate::validate_user_name_result::Result as B;
        use evops_models::UserNameError as N;

        Self {
            result: Some(match value {
                Ok(_) => B::Ok(()),
                Err(e) => match e {
                    N::LenCharMaxViolated => B::LenCharMaxViolated(()),
                    N::NotEmptyViolated => B::NotEmptyViolated(()),
                },
            }),
        }
    }
}

impl<T> From<Result<T, evops_models::EventTitleError>> for crate::ValidateEventTitleResult {
    fn from(value: Result<T, evops_models::EventTitleError>) -> Self {
        use crate::validate_event_title_result::Result as B;
        use evops_models::EventTitleError as N;

        Self {
            result: Some(match value {
                Ok(_) => B::Ok(()),
                Err(e) => match e {
                    N::LenCharMaxViolated => B::LenCharMaxViolated(()),
                    N::NotEmptyViolated => B::NotEmptyViolated(()),
                },
            }),
        }
    }
}

impl<T> From<Result<T, evops_models::EventDescriptionError>>
    for crate::ValidateEventDescriptionResult
{
    fn from(value: Result<T, evops_models::EventDescriptionError>) -> Self {
        use crate::validate_event_description_result::Result as B;
        use evops_models::EventDescriptionError as N;

        Self {
            result: Some(match value {
                Ok(_) => B::Ok(()),
                Err(e) => match e {
                    N::LenCharMaxViolated => B::LenCharMaxViolated(()),
                    N::NotEmptyViolated => B::NotEmptyViolated(()),
                },
            }),
        }
    }
}

impl<T> From<Result<T, evops_models::TagNameError>> for crate::ValidateTagNameResult {
    fn from(value: Result<T, evops_models::TagNameError>) -> Self {
        use crate::validate_tag_name_result::Result as B;
        use evops_models::TagNameError as N;

        Self {
            result: Some(match value {
                Ok(_) => B::Ok(()),
                Err(e) => match e {
                    N::LenCharMaxViolated => B::LenCharMaxViolated(()),
                    N::NotEmptyViolated => B::NotEmptyViolated(()),
                    N::RegexViolated => B::RegexViolated(()),
                },
            }),
        }
    }
}

impl<T> From<Result<T, evops_models::TagAliasError>> for crate::ValidateTagAliasResult {
    fn from(value: Result<T, evops_models::TagAliasError>) -> Self {
        use crate::validate_tag_alias_result::Result as B;
        use evops_models::TagAliasError as N;

        Self {
            result: Some(match value {
                Ok(_) => B::Ok(()),
                Err(e) => match e {
                    N::LenCharMaxViolated => B::LenCharMaxViolated(()),
                    N::NotEmptyViolated => B::NotEmptyViolated(()),
                },
            }),
        }
    }
}

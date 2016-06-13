module.exports = {
  social: {
    invalid: 'Invalid login type'
  },
  email: {
    empty: 'Email cannot be empty',
    invalid: 'Invalid Email',
    length: 'Email should be between 7 to 255 character long'
  },
  password: {
    empty: 'Password cannot be empty',
    length: 'Password should be between 6 to 32 characters long',
    noMatch: 'Password does not match'
  },
  questionId: {
    empty: 'Question Id cannot be empty',
    invalid: 'Invalid question id',
    invalidMultiple: 'One or more of given question Ids are invalid',
    oneOrMoreDoesNotExist: 'One of more of given question Ids returned closed or no questions:'
  },
  questionIds: {
    type: 'Question Ids must be provided in an array',
    required: 'Question Ids required',
    empty: 'Question Ids array cannot be empty'
  },
  answerId: {
    empty: 'Answer Id cannot be empty',
    invalid: 'Invalid answer id'
  },
  questionContent: {
    empty: 'Question content cannot be empty',
    length: 'Question should be between 15 to 100 characters long',
    minLength: 'Question should be of minimum 2 characters in length',
    maxLength: 'Question should be of maximum 255 characters in length'
  },
  questionType: {
    empty: 'Question type is required',
    validValue: 'Question type should be one of the following: complex, mcq or yesOrNo.'
  },
  questionMcqOptions: {
    invalidItem: 'Invalid options',
    empty: 'Options are required',
    arrayLength: 'Options must be minimum 2 or maximum 4.',
    unique: 'All options must be unique.',
    minLength: 'Option length must be of minimum 2 characters',
    maxLength: 'Option length must be of maximum 30 characters'
  },
  questionAllowedAdvisor: {
    value: 'This advisor is not allowed to post the answer'
  },
  answer: {
    empty: 'Answer is required',
    validValue: 'Invalid answer',
    maxLength: 'Answer cannot be more than 255 characters long'
  },
  answerReason: {
    empty: 'Answer Reason is required',
    length: 'Reason should be of max 255 in length'
  },
  advisorChatRating: {
    empty: 'Rating is required',
    validValue: 'Rating should be one of the following: up, down or thanks.'
  },
  answerFeedback: {
    empty: 'Feedback is required',
    validValue: 'Feedback should be one of the following: up, down or thanks.'
  },
  answerWhyChooseMe: {
    empty: 'Why choose me is required',
    length: 'Why choose me should be of max 255 in length'
  },
  chatAvailability: {
    empty: 'Chat Availability is required',
    value: 'Chat Availability should be a boolean value'
  },
  searchTags: {
    invalid: 'Search tags must be a list.'
  },
  searchOption: {
    empty: 'Search option is required',
    validValue: 'Search option should be one of the following: someonelikeme, custom or anyone.'
  },
  userId: {
    empty: 'User Id cannot be empty',
    invalid: 'Invalid user id',
    invalidMultiple: 'One or more of given user Ids are invalid'
  },
  advisorId: {
    empty: 'Advisor Id cannot be empty.',
    invalid: 'Invalid Advisor id.',
    invalidMultiple: 'One or more of given Advisor Ids are invalid.'
  },
  gender: {
    invalid: 'Invalid gender'
  },
  age: {
    value: 'Age should be an integer value between 13 and 120',
    invalid: 'Minimum age should be less than or equal to maximum age'
  },
  kids: {
    numericAndLimit: 'Kids should be a numeric value and less than 20'
  },
  siblings: {
    numericAndLimit: 'Siblings should be a numeric value and less than 20'
  },
  date: {
    invalid: 'Date should be a valid UNIX timestamp'
  },
  about: {
    length: 'About should be of max 255 in length'
  },
  firstName: {
    length: 'Firstname should be a single value and between 3 to 35 characters'
  },
  lastName: {
    length: 'Lastname should be a single value and between 3 to 35 characters'
  },
  avatar: {
    empty: 'Avatar is required',
    type: 'Avatar type should either be JPG, PNG or GIF',
    size: 'Avatar dimension should be between 30 to 500 pixels',
    square: 'Avatar should be square'
  },
  deviceType: {
    empty: 'Device type cannot be empty',
    validValue: 'Device type should either be iOS or Web'
  },
  pushToken: {
    empty: 'Push token cannot be empty',
    invalid: 'Push token is invalid'
  },
  accessToken: {
    empty: 'Token not provided',
    invalid: 'Token invalid',
    expired: 'Token expired'
  },
  profilePrivacy: {
    validValue: 'Profile privacy should be public or private'
  },
  tag: {
    invalid: 'Tag must be a string.',
    required: 'Tag is required',
    empty: 'Tag cannot be an empty string'
  },
  guruTags: {
    invalid: 'Guru Tags must be an array',
    invalidItem: 'Invalid Guru Tag',
    empty: 'Guru Tag cannot be an empty string',
    uniqueItems: 'All Guru Tags must be unique'
  },
  explorerTags: {
    invalid: 'Explorer Tags must be an array',
    invalidItem: 'Invalid Explorer Tag',
    empty: 'Explorer Tag cannot be an empty string',
    uniqueItems: 'All Explorer Tags must be unique'
  },
  employer: {
    arrayLength: 'Cannot add more than 5 employers',
    empty: 'Employer cannot be empty',
    invalidItem: 'Invalid employer',
    uniqueItems: 'Employers should be unique'
  },
  school: {
    arrayLength: 'Cannot add more than 5 schools',
    empty: 'School cannot be empty',
    invalidItem: 'Invalid school',
    uniqueItems: 'Schools should be unique'
  },
  profession: {
    arrayLength: 'Cannot add more than 5 professions ',
    empty: 'Profession cannot be empty',
    invalidItem: 'Invalid profession',
    uniqueItems: 'Professions should be unique'
  },
  hobbies: {
    arrayLength: 'Cannot add more than 5 hobbies',
    empty: 'Hobby cannot be empty',
    invalidItem: 'Invalid hobby',
    uniqueItems: 'Hobbies should be unique'
  },
  education: {
    invalid: 'Invalid Education'
  },
  maritalStatus: {
    invalid: 'Invalid Marital status'
  },
  sexualOrientation: {
    invalid: 'Invalid Sexual orientation'
  },
  politicalAffiliation: {
    invalid: 'Invalid Political affiliation'
  },
  country: {
    empty: 'Country cannot be empty.',
    arrayLength: 'Country can be a single value only'
  },
  religion: {
    invalid: 'Invalid Religion'
  },
  ethnicity: {
    invalid: 'Invalid Ethnicity'
  },
  city: {
    empty: 'City cannot be empty.',
    arrayLength: 'City can be a single value only'
  },
  state: {
    empty: 'State cannot be empty.',
    arrayLength: 'State can be a single value only'
  },
  paginationValues: {
    invalid: 'skip and pageSize must be integer values.',
    minimum: 'pageSize must not be zero'
  },
  hiddenAttributes: {
    invalid: 'Invalid hidden attribute',
    unique: 'Hidden attributes must be unique'
  },
  userType: {
    empty: 'User type cannot be empty.',
    validValue: 'User type should either be seeker or advisor.'
  },
  testimonialContent: {
    empty: 'Testimonial content cannot be empty',
    length: 'Testimonial should be between 15 to 100 characters long'
  },
  testimonialStatus: {
    empty: 'Testimonial status cannot be empty',
    value: 'Testimonial status should be one of the following: submitted, rejected or approved.'
  },
  adContent: {
    empty: 'Ad content cannot be empty',
    length: 'Ad should be between 15 to 100 characters long'
  },
  adTitle: {
    empty: 'Ad Title cannot be empty',
    length: 'Ad Title should be between 15 to 100 characters long'
  },
  adStatus: {
    empty: 'Ad status cannot be empty',
    invalid: 'Invalid ad status'
  },
  searchAttributes: {
    required: 'Search Attributes are required when search option is custom'
  },
  sort: {
    validValue: 'Sort value should be either chatAvailability, level or up',
    invalid: 'Invalid sort value',
    required: 'At least one search attribute must be entered.'
  },
  seekerFeedback: {
    invalid: 'Invalid seeker feedback',
    validValue: 'Seeker feedback should be one of the following: up, down or thanks'
  },
  answered: 'Answered must be a boolean',
  settings: {
    notification: {
      invalid: 'Notification settings can be either true or false',
      type: 'Invalid notification settings type',
      required: 'All notification settings should be either true or false',
      empty: 'Notification settings cannot be empty'
    }
  },
  chatId: {
    empty: 'Chat Id cannot be empty',
    invalid: 'Invalid Chat id'
  },
  chatAdvisorIds: {
    type: 'Advisor IDs must be provided in an array',
    required: 'Advisor IDs required',
    length: 'Advisor IDs must be between 1 and 4.',
    unique: 'All Advisor IDs must be unique.'
  },
  ratings: {
    type: 'Advisor IDs and Rating both must be provided in an array of Objects',
    required: 'Advisor IDs and Rating both required',
    length: 'Advisor IDs and Rating must be between 1 and 4.',
    unique: 'All Advisor IDs must be unique.'
  },
  chatMessageAfter: {
    type: 'After attribute must be an integer epoch time.'
  },
  chatMessageBefore: {
    type: 'Before attribute must be an integer epoch time.'
  },
  chatMessageType: {
    type: 'Chat Message Type should be string.',
    validValue: 'Chat Message Type value can only be text.',
    required: 'Chat Message Type is required.'
  },
  chatMessage: {
    type: 'Chat Message should be string.',
    required: 'Chat Message is required.'
  },
  appToken: {
    empty: 'App token not provided',
    invalid: 'App token invalid',
    expired: 'App token expired'
  },
  paymentGateway: {
    invalid: 'Invalid Payment Gateway',
    required: 'Payment Gateway is required.'
  },
  paymentType: {
    invalid: 'Invalid Payment type',
    required: 'Payment type is required.'
  }
};

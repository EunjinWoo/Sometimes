/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      description
      emojiPath
      profilePath
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      description
      emojiPath
      profilePath
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      description
      emojiPath
      profilePath
      gender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createStep = /* GraphQL */ `
  mutation CreateStep(
    $input: CreateStepInput!
    $condition: ModelStepConditionInput
  ) {
    createStep(input: $input, condition: $condition) {
      id
      requestUserId
      targetUserId
      status
      isAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateStep = /* GraphQL */ `
  mutation UpdateStep(
    $input: UpdateStepInput!
    $condition: ModelStepConditionInput
  ) {
    updateStep(input: $input, condition: $condition) {
      id
      requestUserId
      targetUserId
      status
      isAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteStep = /* GraphQL */ `
  mutation DeleteStep(
    $input: DeleteStepInput!
    $condition: ModelStepConditionInput
  ) {
    deleteStep(input: $input, condition: $condition) {
      id
      requestUserId
      targetUserId
      status
      isAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      kind
      description
      type
      isRequired
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      kind
      description
      type
      isRequired
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      kind
      description
      type
      isRequired
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      x
      y
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      x
      y
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      x
      y
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChatItem = /* GraphQL */ `
  mutation CreateChatItem(
    $input: CreateChatItemInput!
    $condition: ModelChatItemConditionInput
  ) {
    createChatItem(input: $input, condition: $condition) {
      id
      message
      senderId
      chatroomId
      action
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatItem = /* GraphQL */ `
  mutation UpdateChatItem(
    $input: UpdateChatItemInput!
    $condition: ModelChatItemConditionInput
  ) {
    updateChatItem(input: $input, condition: $condition) {
      id
      message
      senderId
      chatroomId
      action
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatItem = /* GraphQL */ `
  mutation DeleteChatItem(
    $input: DeleteChatItemInput!
    $condition: ModelChatItemConditionInput
  ) {
    deleteChatItem(input: $input, condition: $condition) {
      id
      message
      senderId
      chatroomId
      action
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      receiverId
      senderId
      message
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      receiverId
      senderId
      message
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      receiverId
      senderId
      message
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;

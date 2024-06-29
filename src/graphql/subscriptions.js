/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
      id
      likeUserId
      likedUserId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStep = /* GraphQL */ `
  subscription OnCreateStep($filter: ModelSubscriptionStepFilterInput) {
    onCreateStep(filter: $filter) {
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
export const onUpdateStep = /* GraphQL */ `
  subscription OnUpdateStep($filter: ModelSubscriptionStepFilterInput) {
    onUpdateStep(filter: $filter) {
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
export const onDeleteStep = /* GraphQL */ `
  subscription OnDeleteStep($filter: ModelSubscriptionStepFilterInput) {
    onDeleteStep(filter: $filter) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onCreateLocation(filter: $filter) {
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
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onUpdateLocation(filter: $filter) {
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
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
    onDeleteLocation(filter: $filter) {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      participant1Id
      participant2Id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChatItem = /* GraphQL */ `
  subscription OnCreateChatItem($filter: ModelSubscriptionChatItemFilterInput) {
    onCreateChatItem(filter: $filter) {
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
export const onUpdateChatItem = /* GraphQL */ `
  subscription OnUpdateChatItem($filter: ModelSubscriptionChatItemFilterInput) {
    onUpdateChatItem(filter: $filter) {
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
export const onDeleteChatItem = /* GraphQL */ `
  subscription OnDeleteChatItem($filter: ModelSubscriptionChatItemFilterInput) {
    onDeleteChatItem(filter: $filter) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
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

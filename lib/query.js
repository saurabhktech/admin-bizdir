import { gql } from "@apollo/client";

export const GET_ALL_LISTING = gql`
  query GetAllListings($type: String) {
    getAllListings(type: $type) {
      code
      success
      message
      listings {
        _id
        user
        user_name
        listing_name
        phone_number
        whatsapp_number
        listing_email
        category
        subcategory
        listing_status
        listing_address
        website
        country
        cities
        pincode
        listing_detail
        listing_image
        gallery_images
        cover_image
        approval
        approval_by {
          role
          message
          approver_id
        }
        views
      }
    }
  }
`;

export const GET_LISTING_BY_ID = gql`
  query GetListing($id: ID!) {
    getListing(_id: $id) {
      code
      success
      message
      listing {
        _id
        user
        listing_name
        phone_number
        whatsapp_number
        listing_email
        category
        subcategory
        listing_status
        listing_address
        website
        country
        cities
        pincode
        listing_detail
        listing_image
        gallery_images
        cover_image
        youtube_link
        service_location
        approval
        approval_by {
          approver_id
          message
          role
        }
        views
      }
    }
  }
`;

// ROLES =================================>
export const GET_ALL_ROLES = gql`
  query Query {
    getAllRoles {
      code
      success
      message
      roles {
        _id
        role_name
        description
        permissions
      }
    }
  }
`;

export const GET_ROLE = gql`
  query GetRole($id: ID!) {
    getRole(_id: $id) {
      code
      success
      message
      role {
        _id
        role_name
        description
        permissions
      }
    }
  }
`;

// USERS ==================================>
export const GET_ALL_USERS = gql`
  query Query {
    getAllUsers {
      code
      success
      message
      users {
        _id
        name
        email
        gender
        user_status
        profile_image
        total_listing_count
        is_verified {
          status
        }
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query Query($id: ID!) {
    getUser(_id: $id) {
      code
      success
      message
      user {
        _id
        name
        email
        mobile_number
        gender
        cover_image
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      code
      success
      message
      user {
        token
        id
        name
        email
        is_verified
        image
      }
    }
  }
`;

// EMPLOYEE ===============================>
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      message
      code
      success
      employee {
        _id
        name
        email
        image
        role {
          _id
          role_name
          description
          permissions
        }
      }
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      code
      message
      success
      employee {
        _id
        name
        email
        gender
        image
        role {
          _id
          role_name
          description
          permissions
        }
      }
    }
  }
`;
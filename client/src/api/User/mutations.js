import { gql } from "apollo-boost";

const loginMutation = gql`
  mutation($username: String, $password: String) {
    login(username: $username, password: $password) {
      first
      last
      username
      motto
      stable {
        id
        name
        image
        male
        alive
        show
        Arena {
          id
          name
        }
      }
      activeStable {
        id
        name
        image
        male
        alive
        show
        Arena {
          id
          name
        }
      }
    }
  }
`;

const registerMutation = gql`
  mutation(
    $first: String
    $last: String
    $username: String
    $password: String
    $email: String
    $motto: String
  ) {
    register(
      first: $first
      last: $last
      username: $username
      password: $password
      email: $email
      motto: $motto
    ) {
      first
      last
      username
      motto
      stable {
        id
        name
        image
        male
        alive
        show
        Arena {
          id
          name
        }
      }
      activeStable {
        id
        name
        image
        male
        alive
        show
        Arena {
          id
          name
        }
      }
    }
  }
`;

export { loginMutation, registerMutation };

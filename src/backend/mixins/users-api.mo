import UserTypes "../types/users";
import UserLib "../lib/users";
import Map "mo:core/Map";

mixin (
  users : Map.Map<Text, UserLib.User>,
  nextUserId : { var value : Nat },
) {
  public query func getUsers() : async [UserLib.User] {
    UserLib.listUsers(users)
  };

  public query func getUser(id : Text) : async ?UserLib.User {
    UserLib.getUser(users, id)
  };

  public func createUser(
    name : Text,
    email : Text,
    role : UserTypes.UserRole,
    status : UserTypes.UserStatus,
  ) : async UserLib.User {
    UserLib.createUser(users, nextUserId, name, email, role, status)
  };

  public func updateUser(
    id : Text,
    name : ?Text,
    email : ?Text,
    role : ?UserTypes.UserRole,
    status : ?UserTypes.UserStatus,
  ) : async ?UserLib.User {
    UserLib.updateUser(users, id, name, email, role, status)
  };

  public func deleteUser(id : Text) : async Bool {
    UserLib.deleteUser(users, id)
  };
};

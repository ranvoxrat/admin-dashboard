import UserTypes "../types/users";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";

module {
  public type User = UserTypes.User;
  public type UserRole = UserTypes.UserRole;
  public type UserStatus = UserTypes.UserStatus;

  public func listUsers(users : Map.Map<Text, User>) : [User] {
    users.values().toArray()
  };

  public func getUser(users : Map.Map<Text, User>, id : Text) : ?User {
    users.get(id)
  };

  public func createUser(
    users : Map.Map<Text, User>,
    nextId : { var value : Nat },
    name : Text,
    email : Text,
    role : UserRole,
    status : UserStatus,
  ) : User {
    let id = nextId.value;
    nextId.value += 1;
    let user : User = {
      id = id.toText();
      name;
      email;
      role;
      status;
      joinDate = Time.now();
    };
    users.add(user.id, user);
    user
  };

  public func updateUser(
    users : Map.Map<Text, User>,
    id : Text,
    name : ?Text,
    email : ?Text,
    role : ?UserRole,
    status : ?UserStatus,
  ) : ?User {
    switch (users.get(id)) {
      case null null;
      case (?existing) {
        let updated : User = {
          existing with
          name = switch (name) { case (?n) n; case null existing.name };
          email = switch (email) { case (?e) e; case null existing.email };
          role = switch (role) { case (?r) r; case null existing.role };
          status = switch (status) { case (?s) s; case null existing.status };
        };
        users.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteUser(users : Map.Map<Text, User>, id : Text) : Bool {
    switch (users.get(id)) {
      case null false;
      case (?_) {
        users.remove(id);
        true
      };
    }
  };

  public func searchUsers(users : Map.Map<Text, User>, searchTerm : Text) : [User] {
    let lower = searchTerm.toLower();
    users.values().filter(func(u : User) : Bool {
      u.name.toLower().contains(#text lower) or u.email.toLower().contains(#text lower)
    }).toArray()
  };

  public func seedUsers(users : Map.Map<Text, User>, nextId : { var value : Nat }) {
    let samples : [(Text, Text, UserRole, UserStatus)] = [
      ("Alice Johnson", "alice@example.com", #Admin, #Active),
      ("Bob Smith", "bob@example.com", #Editor, #Active),
      ("Carol Williams", "carol@example.com", #Editor, #Active),
      ("David Brown", "david@example.com", #Viewer, #Inactive),
      ("Eve Davis", "eve@example.com", #Viewer, #Active),
    ];
    for ((name, email, role, status) in samples.values()) {
      ignore createUser(users, nextId, name, email, role, status);
    };
  };
};

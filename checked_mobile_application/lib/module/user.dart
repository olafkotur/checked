class User{
  int userId;

  User({this.userId});

  factory User.fromJson(Map<String, dynamic> json){
    return User(userId: json["userId"]);
  }
}

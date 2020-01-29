class Zone {
  //final int zoneId;
  final int userId;
  final String name;
  final int width;
  final int height;
  final int xValue;
  final int yValue;
  final String color;

  Zone({/*this.zoneId,*/ this.userId, this.name, this.width, this.height, this.xValue, this.yValue, this.color});

  factory Zone.fromJson(Map<String, dynamic> json) {
    return Zone(
      //zoneId: json['zoneId'],
      userId: json['userId'],
      name: json['name'],
      width: json['width'],
      height: json['height'],
      xValue: json['xValue'],
      yValue: json['yValue'],
      color: json['color']
    );
  }
}
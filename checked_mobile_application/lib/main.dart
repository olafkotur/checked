import 'package:checked_mobile_application/screens/SignUp.dart';
import 'package:checked_mobile_application/screens/authenticate.dart';
import 'package:checked_mobile_application/screens/home.dart';
import 'package:checked_mobile_application/screens/landing.dart';
import 'package:checked_mobile_application/screens/logIn.dart';
import 'package:checked_mobile_application/services/member_services.dart';
import 'package:checked_mobile_application/services/notification_services.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:checked_mobile_application/services/zone_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void setupLocator(){
  GetIt.instance.registerLazySingleton(() => UserServices());
  GetIt.instance.registerLazySingleton(() => ZoneServices());
  GetIt.instance.registerLazySingleton(() => MembersServices());
  GetIt.instance.registerLazySingleton(() => NotificationServices());
}

void main(){
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Checked',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.orange[600],
        accentColor: Colors.amber,
        accentColorBrightness: Brightness.light,
      ),darkTheme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: Landing(),
    );
  }
}
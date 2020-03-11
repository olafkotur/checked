// // This is a basic Flutter widget test.
// //
// // To perform an interaction with a widget in your test, use the WidgetTester
// // utility that Flutter provides. For example, you can send tap and scroll
// // gestures. You can also use WidgetTester to find child widgets in the widget
// // tree, read text, and verify that the values of widget properties are correct.

// import 'package:checked_mobile_application/screens/home.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter_test/flutter_test.dart';

// void main() {
//   // Define a test. The TestWidgets function also provides a WidgetTester
//   // to work with. The WidgetTester allows building and interacting
//   // with widgets in the test environment.

//   testWidgets('MyWidget has a title and message', (WidgetTester tester) async {
//     // Create the widget by telling the tester to build it.
//     await tester.pumpWidget(MyWidget(title: 'T', message: 'M'));

//     // Create the Finders.
//     final titleFinder = find.text('T');
//     final messageFinder = find.text('M');

//     // Use the `findsOneWidget` matcher provided by flutter_test to
//     // verify that the Text widgets appear exactly once in the widget tree.
//     expect(titleFinder, findsOneWidget);
//     expect(messageFinder, findsOneWidget);
//   });

//     testWidgets('Home screen', (WidgetTester tester) async {
//     // Create the widget by telling the tester to build it.
//     await tester.pumpWidget(Home());

//     expect(find.text("Mocked Zone"), findsOneWidget);
//     expect(find.text("Zone 4"), findsOneWidget);
//     expect(find.text("New Zone"), findsOneWidget);

//     expect(find.text("Log In"), findsNothing);
//     expect(find.text("Sign Up"), findsNothing);
//   });

//   testWidgets('Drag and drop feedback', (WidgetTester tester) async {
//     // Create the widget by telling the tester to build it.
//     await tester.pumpWidget(Home());

//     expect(find.text("Mocked Zone"), findsOneWidget);
//     expect(find.text("Zone 4"), findsOneWidget);
//     expect(find.text("New Zone"), findsOneWidget);

//     expect(find.text("Log In"), findsNothing);
//     expect(find.text("Sign Up"), findsNothing);
//   });

//   testWidgets('Add and remove a zone box', (WidgetTester tester) async {

//   // Tap the add button.
//   await tester.tap(find.byType(FloatingActionButton));

//   // Rebuild the widget after the state has changed.
//   await tester.pump();

//   // Expect to find the item on screen.
//   expect(find.text('hi'), findsOneWidget);

//   // Swipe the item to dismiss it.
//   await tester.drag(find.byType(Dismissible), Offset(500.0, 0.0));

//   // Build the widget until the dismiss animation ends.
//   await tester.pumpAndSettle();
// });
// }

// class MyWidget extends StatelessWidget {
//   final String title;
//   final String message;

//   const MyWidget({
//     Key key,
//     @required this.title,
//     @required this.message,
//   }) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Flutter Demo',
//       home: Scaffold(
//         appBar: AppBar(
//           title: Text(title),
//         ),
//         body: Center(
//           child: Text(message),
//         ),
//       ),
//     );
//   }
// }


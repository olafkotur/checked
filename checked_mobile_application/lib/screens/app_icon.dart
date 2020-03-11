import 'dart:io';

import 'package:flutter/services.dart';

enum IconType { Checked, Spar, NHS }

class AppIcon {
  static const MethodChannel platform = MethodChannel('appIconChannel');

  static Future<void> setLauncherIcon(IconType icon) async {
    if (!Platform.isIOS) return null;

    String iconName;

    switch (icon) {
      case IconType.Checked:
        iconName = 'Checked';
        break;
      case IconType.Spar:
        iconName = 'Spar';
        break;
      case IconType.NHS:
        iconName = 'NHS';
        break;
      default:
        iconName = 'Spar';
        break;
    }

    return await platform.invokeMethod('changeIcon', iconName);
  }
}
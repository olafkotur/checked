import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let appIconChannel = FlutterMethodChannel(name: "appIconChannel", binaryMessenger: controller.binaryMessenger)
    
    appIconChannel.setMethodCallHandler({
        [weak self](call: FlutterMethodCall, result: FlutterResult) -> Void in
        guard call.method == "changeIcon" else {
            result(FlutterMethodNotImplemented)
            return
        }
        self?.changeIcon(call: call)
    })
    
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
    
    private func changeIcon(call: FlutterMethodCall){
        if #available(iOS 10.3, *) {
            guard UIApplication.shared.supportsAlternateIcons else {
                return
            }
                
                let arguments : String = call.arguments as! String
                
                if arguments == "Checked" {
                    UIApplication.shared.setAlternateIconName("Checked")
                } else if arguments == "NHS" {
                    UIApplication.shared.setAlternateIconName("NHS")
                } else if arguments == "Spar" {
                    UIApplication.shared.setAlternateIconName("Spar")
                } else {
                    UIApplication.shared.setAlternateIconName(nil)
                }
                

        } else {
            // Fallback on earlier versions
        }
    }
}

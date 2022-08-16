require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-bitcoin-helpers"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-bitcoin-helpers
                   DESC
  s.homepage     = "https://github.com/Jasonvdb/react-native-bitcoin-helpers"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Jasonvdb" => "jayvdb1@gmail.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/Jasonvdb/react-native-bitcoin-helpers.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.vendored_frameworks = 'ios/bdkFFI.xcframework'
  s.dependency "React"
end

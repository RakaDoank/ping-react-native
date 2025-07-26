require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNPing"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported, :osx => "10.14" }
  s.source       = { :git => "https://github.com/RakaDoank/ping-react-native.git", :tag => "#{s.version}" }

  s.source_files = "apple/**/*.{h,m,mm,cpp}"
  s.ios.exclude_files = "**/*.macos.{h,m,mm}"
  s.tvos.exclude_files = "**/*.macos.{h,m,mm}"
  s.osx.exclude_files = "**/*.ios.{h,m,mm}"
  s.private_header_files = "apple/**/*.h"

 install_modules_dependencies(s)
end

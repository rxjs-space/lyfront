cd dist
copy index.html 404.html
gzip -rk *.*
del /q "..\..\coding\longyunapp\*.*"
for /d %%i in (..\..\coding\longyunapp\*.*) do rmdir /s /q "%%i"
xcopy *.* ..\..\coding\longyunapp /e
cd..


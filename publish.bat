cd C:\Users\gabri\workspace\meuestoque
call npm run build
cd C:\Users\gabri\workspace\gabrielchristino.github.io
del * /Q
rmdir /S assets /Q
xcopy /S C:\Users\gabri\workspace\meuestoque\dist\estoque C:\Users\gabri\workspace\gabrielchristino.github.io
git add .
git commit -a -m "update"
git push
pause
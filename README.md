# JankenAPI
じゃんけんの記録を保存してくれるAPIです。

このリポジトリはCode Chrysalisの生徒であるときに作成しました。
This was created during my time as a student at Code Chrysalis.

## 1. 遊び方
1・左上の入力フォームにユーザー名を記入してください。

2・飛行機のボタンを押してください。ユーザー名が登録されます。

3・✊✌️✋の中から好きなボタンを押しましょう。

4・上に✊✌✋のいずれがでてきます。これがパソコンの手です。

5・遊び終わったらsaveボタンを押しデータを記録しましょう。

6・左側の記録欄にあなたの結果が表示されるはずです。


## 2. 使用した外部ライブラリ

・postgres 

・express

・knex

・jQuery

## 2. エンドポイントについて
Get  /result

・今まで遊んだお友達の名前と結果の一覧がわかるよ

・サイトが読み込まれたとき、データが更新されたときに使われるよ
 
 
Post  /result

・新しい結果を追加することができるよ

・初めて遊んだお友達の結果を記録するときに使われるよ


Patch   /result/:name/:score

・記録の更新ができるよ　

  Nameの部分にセーブしたお名前、scoreの部分に新しい記録をいれてね
  
・一回遊んだことがあるお友達が、また遊んでくれたときに使われるよ 


delete  /result

・記録を消すことができるよ

・たくさん負けちゃった時に使うといいかも⁉︎


・・・・・・・


初めて自分で作成したAPIでまだまだ至らない点が多いと思います。
お気づきの点がありましたらお知らせください。

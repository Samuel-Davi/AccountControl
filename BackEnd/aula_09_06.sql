create database jogos;
use jogos;

create table jogo(
	id integer unsigned not null,
    nome varchar(50),
    img varchar(150),
    primary key(id)
);
select * from jogos.jogo;
insert into jogo (nome, img)
values ('Fortnite', 'https://blog.kabum.com.br/wp-content/uploads/2021/04/br16-socialshare-lineup1-1920x1080-cc758b8820b8.jpg');
insert into jogo(nome, img)
values('Free Fire', 'https://d2skuhm0vrry40.cloudfront.net/2021/articles/2021-05-10-14-21/free-fire-truques-e-dicas-para-novatos-e-veteranos-1620652906649.jpg/EG11/resize/1200x-1/free-fire-truques-e-dicas-para-novatos-e-veteranos-1620652906649.jpg');
insert into jogo(nome, img)
values('Fifa 21', 'https://s2.glbimg.com/f5UpJFXD2wQR3-HMNa927HxTd7c=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/r/7/mSrPjAQTq0uFHNHiBjpQ/fifa-21-intros.jpg');

select * from jogos.usuario;
desc jogo;
alter table jogo
change idade img varchar(250);
show tables;

update jogo set img = 'https://s2.glbimg.com/M0ll8r3w3WsiRLLroy5xJaK4A5c=/0x0:1656x915/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/j/3cZcm6Qf6TxFIAW0nMNg/como-baixar-valorant-de-graca-the-squad.jpg'
where nome = 'valorant';
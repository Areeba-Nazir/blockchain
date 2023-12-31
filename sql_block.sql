PGDMP         	                {         
   blockchain    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24954 
   blockchain    DATABASE     �   CREATE DATABASE blockchain WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE blockchain;
                postgres    false            �            1259    25001    blockchains    TABLE     �   CREATE TABLE public.blockchains (
    id integer NOT NULL,
    number text,
    hash text,
    previous text,
    data text,
    nonce text
);
    DROP TABLE public.blockchains;
       public         heap    postgres    false            �            1259    25000    blockchains_id_seq    SEQUENCE     �   CREATE SEQUENCE public.blockchains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.blockchains_id_seq;
       public          postgres    false    217                       0    0    blockchains_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.blockchains_id_seq OWNED BY public.blockchains.id;
          public          postgres    false    216            �            1259    24983    users    TABLE     i   CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24982    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            	           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            k           2604    25004    blockchains id    DEFAULT     p   ALTER TABLE ONLY public.blockchains ALTER COLUMN id SET DEFAULT nextval('public.blockchains_id_seq'::regclass);
 =   ALTER TABLE public.blockchains ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            j           2604    24986    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                      0    25001    blockchains 
   TABLE DATA                 public          postgres    false    217   \       �          0    24983    users 
   TABLE DATA                 public          postgres    false    215   �       
           0    0    blockchains_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.blockchains_id_seq', 67, true);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    214            o           2606    25008    blockchains blockchains_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.blockchains
    ADD CONSTRAINT blockchains_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.blockchains DROP CONSTRAINT blockchains_pkey;
       public            postgres    false    217            m           2606    24990    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215               2  x����JA���s��e&��� zQ�
�z��c�mm��ךּ��5'���ɷZo�O[�Zo���wm���!�����,&m�Dw��t�D���S�h�s%"�s�����e��܈��J�ո�,�*��:+J2k#Z ��3Af̹v�M��Ȑ���/�{�-����-w�/M���k��.ӛ���L��!��&�lT1ʄE�eP�$�#m,`$��|^�Lr�٘ ����y~;siD��A��C����5��2; �hZVe�@v:;�rp���t
�f��Z�>���EPS�`4��Y�7      �   �   x���v
Q���W((M��L�+-N-*V��L�Q�K�M�QH�M���Q(H,..�/J�Ts�	uV�0�QPw,JMMJT��,�t�j���\����5�'%���Q��h��d(��dPFnj�:��jIANb�����)�6��,(,���F�d�V���.)�,�Xfa��� ���y     
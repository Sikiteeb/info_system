--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Homebrew)
-- Dumped by pg_dump version 14.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: sismin
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    real_name character varying(255) NOT NULL,
    code_name character varying(255),
    phone_number character varying(50) NOT NULL
);


ALTER TABLE public.contacts OWNER TO sismin;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: sismin
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO sismin;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sismin
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: sismin
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: sismin
--

COPY public.contacts (id, real_name, code_name, phone_number) FROM stdin;
4	Mina Mana	MeiaK	234-546-676
6	Jane Puu	Jänku	987-654-3210
3	Aliis Kuu	Nipernaadi	555-123-4567
7	6Tara Mia?	879Nak!	675-7464-876
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sismin
--

SELECT pg_catalog.setval('public.contacts_id_seq', 11, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: sismin
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


CREATE TABLE IF NOT EXISTS prefixes (
    server_id varchar(20) primary key,
    prefix varchar(4),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);
use world_bank_data;
LOAD DATA local INFILE '/home/aris/data-visualization/csv_data/output.csv' INTO TABLE data
FIELDS terminated by ',';
LOAD DATA local INFILE '/home/aris/data-visualization/csv_data/data_3_years_avg.csv' INTO TABLE data_3_years_avg
FIELDS terminated by ',';
LOAD DATA local INFILE '/home/aris/data-visualization/csv_data/data_5_years_avg.csv' INTO TABLE data_5_years_avg
FIELDS terminated by ',';
LOAD DATA local INFILE '/home/aris/data-visualization/csv_data/data_10_years_avg.csv' INTO TABLE data_10_years_avg
FIELDS terminated by ',';

import csv 

Indicators_list = ["AG.LND.FRST.ZS", "SH.XPD.CHEX.GD.ZS",
 "EG.ELC.ACCS.ZS", "SE.PRM.UNER.MA.ZS",
  "SE.PRM.UNER.FE.ZS", "TM.VAL.FUEL.ZS.UN", 
  "TX.VAL.FUEL.ZS.UN", "MS.MIL.XPND.GD.ZS",
   "IP.JRN.ARTC.SC", "SL.UEM.1524.MA.NE.ZS",
    "SL.UEM.1524.FE.NE.ZS", "ST.INT.ARVL"]

country_list = ["alb", "cyp", "grc", "arg", "aus", "bgr", "chl", "cub", "cze", "dnk", "fra", "bra"]

new_data = []
def select_data(data_list):
	line = 0
	selected_data = []
	for row in data_list:
		if line < 5:
			line += 1 #skip the first five lines 
		else:
			if row[3] in Indicators_list:
				selected_data.append(convert_to_float(row))
	return selected_data

	
def convert_to_float(row):
	for i in range (len(row)):
		if i > 3:
			if row[i] != "":
				row[i] = float(row[i])
	return row
		
def fill_new_list():
	output_list = []

	for i in range (60):
		output_list.append(['', '', '', '', '', '', '', '', '', '', '', '', '', ''])

	for row in new_data:
		for i in range (4, len(row)):
			j = i - 4
			output_list[j][0] = row[1]		
			output_list[j][13] = 1960 + j
		 
	for row in new_data:
		for j in range (60):
			output_list[j][Indicators_list.index(row[3]) + 1] = row[4 + j]
	
	for i in range (len(output_list)):
		for j in range (len(output_list[i])):
			if output_list[i][j] == '':
				output_list[i][j] = '\\N'
	return output_list

def compute_avg(list_, years):
	all_counrties_list =[]
	for i in range(len(list_)):
		grouped_list=[]
		for r in range (0, 60, years):
			sum_list = [0.0]*12
			not_null_years = [0]*12
			for j in range(years):
				for l in range (12):
					if list_[i][r+j][l+1] != '\\N':
						sum_list[l] += float(list_[i][r+j][l+1])
						not_null_years[l] += 1
			for k in range(12):
				if not_null_years[k] == 0:
					sum_list[k] = '\\N'
				else:
					sum_list[k] = sum_list[k]/not_null_years[k]
					
			sum_list.append(1960 + r)
			sum_list.insert(0, list_[i][0][0])
			grouped_list.append(sum_list)
		all_counrties_list.append(grouped_list)
	return all_counrties_list

final_list = []
for c in country_list:
	with open(c + '.csv') as csv_file:
		full_list = list(csv.reader(csv_file, delimiter=','))
	new_data = select_data(full_list)

	for row in new_data:
		row.pop()
	final_list.append(fill_new_list())

average_3_years = compute_avg(final_list, 3)
average_5_years = compute_avg(final_list, 5)
average_10_years = compute_avg(final_list, 10)

with open('output.csv', 'w', newline='') as file:
    for i in range (len(final_list)):
        writer = csv.writer(file)
        writer.writerows(final_list[i])

with open('data_3_years_avg.csv', 'w', newline='') as file:
    for i in range (len(average_3_years)):
        writer = csv.writer(file)
        writer.writerows(average_3_years[i])

with open('data_5_years_avg.csv', 'w', newline='') as file:
    for i in range (len(average_5_years)):
        writer = csv.writer(file)
        writer.writerows(average_5_years[i])

with open('data_10_years_avg.csv', 'w', newline='') as file:
    for i in range (len(average_10_years)):
        writer = csv.writer(file)
        writer.writerows(average_10_years[i])

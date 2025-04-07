import csv


with open('CSV/Episode_Dates_2.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    with open('Simpler_Episode_Dates.csv', 'w') as new_file:
        fieldnames = ["id","painting_index","img_src","painting_title","season","episode","youtube_src", "colors", "color_hex"]
        left_out = ['Cadmium_Yellow', 'Bright_Red', 'Indian_Yellow', 'Phthalo_Blue', 'Black_Gesso', 'Liquid_Black', 'Alizarin_Crimson', 'Midnight_Black', 'Phthalo_Green', 'Dark_Sienna', 'Van_Dyke_Brown', 'Burnt_Umber', 'Indian_Red',
                     'Prussian_Blue', 'Yellow_Ochre', 'Sap_Green', 'num_colors', 'Titanium_White', 'Liquid_Clear']
        csv_writer = csv.DictWriter(new_file, fieldnames=fieldnames, delimiter='\t')
        csv_writer.writeheader()

        for line in csv_reader:
            cleaned_line = {k: v for k, v in line.items() if k not in left_out}
            csv_writer.writerow(cleaned_line)

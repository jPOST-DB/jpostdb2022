// Global Project Table
jpost.globalProjectColumns = [
    {
        title: 'Project ID',
        field: 'project_id',
        format: function(project) {
            var url = 'project.php?id=' + project.project_id;
            var tag = '<a href="' + url + '" target="_blank">' + project.project_id + '</a>';
            return tag;
        },
        width: 200
    },
    {
        title: 'Project Title',
        field: 'project_title',
        width: 600,
    },
    {
        title: 'Species List',
        field: 'species_list',
        width: 250
    },
    {
        title: '#datasets',
        field: 'dataset_count',
        width: 100,
        align: 'right'
    }
];

// Global Dataset Table
jpost.globalDatasetColumns = [
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        format: function(dataset) {
            var url = 'dataset.php?id=' + dataset.dataset_id;
            var tag = '<a href="' + url + '" target="_blank">' + dataset.dataset_id + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: 'Project ID',
        field: 'project_id',
        format: function(dataset) {
            var url = 'project.php?id=' + dataset.project_id;
            var tag = '<a href="' + url + '" target="_blank">' + dataset.project_id + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: '#proteins',
        field: 'protein_count',
        width: 200,
        align: 'right'
    },
    {
        title: '#spectra',
        field: 'spectrum_count',
        width: 200,
        align: 'right'
    }
];

// Global Protein Table
jpost.globalProteinColumns = [
    {
        title: 'Protein Name',
        field: 'full_name',
        format: function (protein) {
            var url = 'protein.php?id=' + protein.accession;
            var tag = '<a href="' + url + '" target="_blank">' + protein.full_name + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: 'Accession',
        field: 'accession',
        format: function (protein) {
            var accession = protein.accession;
            var url = 'https://www.uniprot.org/uniprot/' + accession;
            var tag = '<a href="' + url + '">' + accession + '</a>';
            return tag;
        },
        width: 180
    },
    {
        title: 'ID',
        field: 'mnemonic',
        width: 180
    },
    {
        title: 'Length',
        field: 'length',
        width: 100,
        align: 'right'
    },
    {
        title: 'Sequence',
        field: 'sequence',
        width: 350,
    }
];

// Global Peptide Table
jpost.globalPeptideColumns = [
    {
        title: 'ID',
        field: 'peptide_id',
        format: function (peptide) {
            var id = peptide.peptide_id;
            var url = 'peptide.php?id=' + id;
            if( jpost.slice !== null ) {
                url = url + '&slice=' + jpost.slice.name;
            }
            var tag = '<a href="' + url + '" target="_blank">' + id + '</a>';
            return tag;
        },
        width: 250
    },
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        format: function (peptide) {
            var url = 'dataset.php?id=' + peptide.dataset_id;
            var tag = '<a href="' + url + '" target="_blank">' + peptide.dataset_id + '</a>';
            return tag;
        },
        width: 200
    },
    {
        title: 'Protein Name',
        field: 'full_name',
        format: function (peptide) {
            var url = 'protein?id=' + peptide.accession;
            var tag = '<a href="' + url + '" target="_blank">' + peptide.full_name + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: 'Accession',
        field: 'accession',
        format: function (peptide) {
            var accession = peptide.accession;
            var url = 'https://www.uniprot.org/uniprot/' + accession;
            var tag = '<a href="' + url + '">' + accession + '</a>';
            return tag;
        },
        width: 180
    },
    {
        title: 'Protein ID',
        field: 'mnemonic',
        width: 180
    },
    {
        title: 'Sequence',
        field: 'sequence',
        width: 350,
    }
];

// Global PSM Table
jpost.globalPsmColumns = [
    {
        title: 'ID',
        field: 'psm_id',
        width: 200,
    },
    {
        title: 'jPOST Score',
        field: 'jpost_score',
        width: 120,
        align: 'right'
    },
    {
        title: 'Charge',
        field: 'charge',
        width: 100,
        align: 'right'
    },
    {
        title: 'Calculated Mass',
        field: 'calc_mass',
        width: 200,
        align: 'right'
    },
    {
        title: 'Experimental Mass',
        field: 'exp_mass',
        width: 200,
        align: 'right'
    },
    {
        title: 'Sequence',
        field: 'sequence',
        width: 350,
    }
];

// Project Dataset Table
jpost.projectDatasetColumns = [
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        format: function(project) {
            var url = 'dataset.php?id=' + project.dataset_id;
            var tag = '<a href="' + url + '" target="_blank">' + project.dataset_id + '</a>';
            return tag;
        },        
        width: 200
    },
    {
        title: 'Species',
        field: 'species',
        width: 250,
    },
    {
        title: 'Cell line',
        field: 'cell_line',
        width: 200
    },
    {
        title: 'Organ',
        field: 'organ',
        width: 200
    },
    {
        title: 'Disease',
        field: 'disease',
        width: 200
    },
    {
        title: 'Fractionation',
        field: 'fractionation',
        width: 200
    },
    {
        title: '#proteins',
        field: 'protein_count',
        width: 120,
        align: 'right'
    },
    {
        title: '#peptides',
        field: 'peptide_count',
        width: 120,
        align: 'right'
    },
    {
        title: '#spectra',
        field: 'spactrum_count',
        width: 120,
        align: 'right'
    },
    {
        title: '#raw files',
        field: 'raw_file_name',
        width: 120,
        format: function(dataset) {
            files = dataset['raw_file_name'].split(',');
            return '' + files.length;
        },
        align: 'right'
    }
]

// Slice Dataset Table
jpost.sliceDatasetColumns = [
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        width: 200
    },
    {
        title: 'Project ID',
        field: 'project_id',
        width: 200
    },
    {
        title: 'Project Title',
        field: 'project_title',
        width: 350
    },
    {
        title: 'Project Date',
        field: 'project_date',
        width: 180
    },
    {
        title: '#proteins',
        field: 'protein_count',
        width: 120,
        align: 'right'
    },
    {
        title: '#spectra',
        field: 'spectrum_count',
        width: 120,
        align: 'right'
    }
];

// Slice Protein Table
jpost.sliceProteinColumns = [
    {
        title: 'Protein Name',
        field: 'full_name',
        format: function (protein) {
            var url = 'protein.php?id=' + protein.accession + '&slice=' + jpost.slice.name;
            var tag = '<a href="' + url + '" target="_blank">' + protein.full_name + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: 'Accession',
        field: 'accession',
        format: function (protein) {
            var accession = protein.accession;
            var url = 'https://www.uniprot.org/uniprot/' + accession;
            var tag = '<a href="' + url + '">' + accession + '</a>';
            return tag;
        },
        width: 180
    },
    {
        title: 'ID',
        field: 'mnemonic',
        width: 180
    },
    {
        title: 'Length',
        field: 'length',
        width: 100,
        align: 'right'
    },
    {
        title: 'Sequence',
        field: 'sequence',
        width: 350,
    }
];

// Slice Peptide Columns
jpost.slicePeptideColumns = [
    {
        title: 'ID',
        field: 'peptide_id',
        format: function (peptide) {
            var id = peptide.peptide_id;
            var url = 'peptide.php?id=' + id + '&slice=' + jpost.slice.name;
            var tag = '<a href="' + url + '" target="_blank">' + id + '</a>';
            return tag;
        },
        width: 250
    },
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        format: function (peptide) {
            var url = 'dataset.php?id=' + peptide.dataset_id;
            var tag = '<a href="' + url + '" target="_blank">' + peptide.dataset_id + '</a>';
            return tag;
        },
        width: 200
    },
    {
        title: 'Protein Name',
        field: 'full_name',
        format: function (peptide) {
            var url = 'protein?id=' + peptide.accession + '&slice=' + jpost.slice.name;
            var tag = '<a href="' + url + '" target="_blank">' + peptide.full_name + '</a>';
            return tag;
        },
        width: 350
    },
    {
        title: 'Accession',
        field: 'accession',
        format: function (peptide) {
            var accession = peptide.accession;
            var url = 'https://www.uniprot.org/uniprot/' + accession;
            var tag = '<a href="' + url + '">' + accession + '</a>';
            return tag;
        },
        width: 180
    },
    {
        title: 'Protein ID',
        field: 'mnemonic',
        width: 180
    },
    {
        title: 'Sequence',
        field: 'sequence',
        width: 350,
    }
];

// Dialog Dataset Table
jpost.dialogDatasetColumns = [
    {
        title: '<input type="checkbox" id="dialog_dataset_all_check">',
        align: 'center',
        width: 50,
        format: function (dataset) {
            var tag = '<input type="checkbox" name="dialog_slice[]" value="' + dataset.dataset_id + '" ';
            tag = tag + 'class="dialog_dataset_check"';
            var slice = jpost.getSelectedSlice();
            if (slice != null) {
                var checked = false;
                slice.datasets.forEach(
                    function (element) {
                        if (element == dataset.dataset_id) {
                            checked = true;
                        }
                    }
                );
                if (checked) {
                    tag = tag + ' checked';
                }
                tag = tag + '>';
            }
            return tag;
        },
        sortable: false
    },
    {
        title: 'Dataset ID',
        field: 'dataset_id',
        width: 200
    },
    {
        title: 'Project ID',
        field: 'project_id',
        width: 200
    },
    {
        title: 'Project Title',
        field: 'project_title',
        width: 350
    },
    {
        title: 'Project Date',
        field: 'project_date',
        width: 180
    },
    {
        title: '#proteins',
        field: 'protein_count',
        width: 120,
        align: 'right'
    },
    {
        title: '#spectra',
        field: 'spectrum_count',
        width: 120,
        align: 'right'
    }
];

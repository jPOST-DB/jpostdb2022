// filter
jpost.filters = [
    {title: 'Species',      name: 'species'},
    {title: 'Organ',        name: 'organ'},
    {title: 'Disease',      name: 'disease'},
    {title: 'Sample type',  name: 'sample_type'},
    {title: 'Cell line',    name: 'cell_line'},
    {title: 'Modification', name: 'modification'},
    {title: 'Instrument',   name: 'instrument'}
];

jpost.filterChartIds = {};

// global tables
jpost.globalTables = [];

// prepare filter
jpost.prepareFilter = function() {
    $('#filter_title_button').click(jpost.toggleFilterForm);
}

// toggle filter form
jpost.toggleFilterForm = function() {
    var status = $('#filter_body').css('display');
    if(status === 'none') {
        $('#filter_body').css('display', 'block');
        $('#filter_title_icon').removeClass('fa-caret-down');
        $('#filter_title_icon').addClass('fa-caret-up');
    }
    else {
        $('#filter_body').css('display', 'none');
        $('#filter_title_icon').removeClass('fa-caret-up');
        $('#filter_title_icon').addClass('fa-caret-down');
    }
}

// add form
jpost.addForm = function(num, count) {
    var id = jpost.formCount;
    jpost.formCount++;

    var tag = '<div id="filter_form_line' + id + '" class="form_line"></div>';
    $('#filter_form').append(tag);
    
    jpost.addFormSelection(id);
    jpost.addFormText(id);
    jpost.addFormDeleteButton(id);
    jpost.addFilterChart(id);
    jpost.updateFilterForm(id);
    if(jpost.getNextFormType() === null) {
        $('#form_add_button').prop('disabled', true);
    }

    if(num != undefined && num > 0){
	    if(count == undefined) {
            count = 0;  
        }
	    let id = setInterval(
            function(){
	            let shadowRoot = document.getElementsByTagName("togostanza-stat_pie_chart")[count].shadowRoot;
	            if(shadowRoot && shadowRoot.childNodes[0] && shadowRoot.childNodes[0].getElementsByTagName("div")[0]){
		            clearInterval(id);
    		        jpost.addForm(num - 1, count + 1);
	            }
	        },
            100
        );
    }
}

// add form selection
jpost.addFormSelection = function(id) {
    var value = jpost.getNextFormType();
    var tag = '<select id="form_selection' + id + '" style="width: 175px; margin-right: 10px;" '
            + 'name="filter' + id + '"></select>';
    $('#filter_form_line' + id).append(tag);

    jpost.filters.forEach( 
        function(filter) {
            var tag = '<option value="' + filter.name + '">' + filter.title + '</option>';
            $('#form_selection' + id).append(tag);
        }
    );
    $('#form_selection' + id).val(value);
    $('#form_selection' + id).change(
        function() {
            jpost.updateFilterForm(id);
        }
    );
    jpost.updateFilterSelections();
}

// get pie chart type name
jpost.getPieChartTypeName = function(type) {
    var chartType = type;
    return chartType;
}

// add filter chart
jpost.addFilterChart = function( id ) {
    var type = $( '#form_selection' + id ).val();
    type = jpost.getPieChartTypeName( type );
    var stanzaId = 'filter_chart' + id;
    var clazz = 'pie_chart_stanza-' + type;
    var tag = '<div id="' + stanzaId + '" class="pie_chart_stanza '
            + clazz + '"></div>';
    $( '#filter_chart' ).append( tag );
    jpost.loadPieChart( stanzaId, type, id );
}

// set stanza parameters 
jpost.setStanzaParameters = function(parameters) {
    var filter = jpost.getFilterParameters();
    jpost.filters.forEach(
        function(item) {
            var name = item.name;
            if(name in filter) {
                var value = filter[name];
                if(value !== null && value !== undefined && value.length !== 0) {
                    parameters[name] = value.join(',');
                }
            }
            name = name + '_s';
            if( name in filter ) {
                var value = filter[name];
                if(value !== null && value !== undefined && value.length !== 0) {
                    parameters[name] = value.join(',');
                }
            }
       }
   );
}


// load pie chart
jpost.loadPieChart = function(stanzaId, type, id) {
    var innerId = stanzaId + '_inner';
    var stanzas = [
        {
            name: 'stat_pie_chart',
            id: stanzaId,
            data: function() {
                var data = {type: type, id: innerId};
                jpost.setStanzaParameters(data);
                return data;
            }
        }
    ];
    jpost.filterChartIds[stanzaId] = type;
    jpost.loadStanzas(stanzas);
}

// gets the next form type
jpost.getNextFormType = function() {
    var parameters = $('#filter_form').serializeArray();
    var values = [];
    parameters.forEach(
        function(parameter) {
            values.push(parameter.value);
        }
    );
    var value = null;
    jpost.filters.forEach(
        function(filter) {
            if(values.indexOf(filter.name) < 0) {
                if(value === null) {
                    value = filter.name;
                }
            }
        }
    );
    return value;
}

// adds form text
jpost.addFormText = function(id) {
    var tag = '<select type="text" id="form_selection' + id + '_value" '
            + 'style="display: none;" class="form_selection_value" '
            + 'name="filter' + id + '_value" multiple></select>';
    $('#filter_form_line' + id).append(tag);
}

// adds form delete button
jpost.addFormDeleteButton = function(id) {
    var tag = '<a href="javascript:jpost.deleteForm(' + id + ')" '
            + 'class="fas fa-times-circle icon_button_red" '
            + 'style="margin-left: 10px;"></a>';
    $('#filter_form_line' + id).append(tag);
}

// delete form
jpost.deleteForm = function(id) {
    $('#filter_form_line' + id).remove();
    var stanzaId = 'filter_chart' + id;
    $('#' + stanzaId).remove();
    delete jpost.filterChartIds[stanzaId];

    jpost.updateGlobalTables();

    if(jpost.getNextFormType() !== null) {
        $('#form_add_button').prop('disabled', false);
    }
}

// update filter form
jpost.updateFilterForm = function( id ) {
    $('#form_selection' + id + '_value').css('display', 'none');

    var item = $('#form_selection' + id).val();

    $('#form_selection' + id + '_value').val(null).trigger('change');
    $('#form_selection' + id + '_value').select2(
        {
            ajax: {
                url: 'preset_list.php',
                type: 'GET',
                data: function(params) {
                    var parameters = jpost.getFilterParameters();
                    parameters.item = item;
                    return parameters;
                },
                processResults: function(result, params) {
                    var array = result.map(
                        function(object) {
                            return {id: object.id, text: object.label};
                        }
                    );
                    return {results: array};
                }
            },
            width: '100%',
            tags: true
        }
    );

    $('#form_selection' + id + '_value').css('display', 'inline');
    $('#form_selection' + id + '_value').change(jpost.updateGlobalTables);

    var stanzaId = 'filter_chart' + id;

    var type = jpost.getPieChartTypeName(item);
    jpost.filterChartIds[stanzaId] = type;
    jpost.updateFilterSelections();
    if(table.tables && table.tables['projects'] && table.tables['datasets'] && table.tables['proteins']) {
        jpost.updateGlobalTables();
    } 
}

// update filter selections
jpost.updateFilterSelections = function() {
    var parameters = $( '#filter_form' ).serializeArray();
    var values = {};
    var filters = [];
    parameters.forEach(
        function(parameter) {
            values[parameter.name] = parameter.value;
            filters.push(parameter.value);
        }
    );

    for(var i = 0; i < jpost.formCount; i++) {
        var id = i;
        if(('filter' + id) in values) {
            $('#form_selection' + id + ' option').prop('disabled', false);
            jpost.filters.forEach(
                function(filter) {
                    if(filters.indexOf( filter.name ) >= 0) {
                        $('#form_selection' + id + ' option[value="' + filter.name + '"]').prop('disabled', true);
                    }
                }
            );
            $('#form_selection' + id + ' option:selected').prop('disabled', false);
        }
    }
}

// reset filters
jpost.resetFilters = function() {
    $('#filter_form').html('');
    $('#filter_chart').html('');
    jpost.addForm();
}

// create project table
jpost.createGlobalProjectTable = function(id) {
    table.createTable(
        id,
        {
            url: 'project_table.php',
            columns: jpost.globalProjectColumns,
            parameters: function() {
                var params = jpost.getFilterParameters();
                return params;
            },
            countClass: 'project_table_tab_button',
            countUpdate: function(count) {
                return 'Project (' + count + ')';
            }
        },
        true
    );
}

// create dataset table
jpost.createGlobalDatasetTable = function(id) {
    table.createTable(
        id,
        {
            url: 'dataset_table.php',
            columns: jpost.globalDatasetColumns,
            parameters: function() {
                var params = jpost.getFilterParameters();
                return params;
            },
            countClass: 'dataset_table_tab_button',
            countUpdate: function(count) {
                return 'Dataset (' + count + ')';
            }
        },
        true
    );
}

// get filter parameters
jpost.getFilterParameters = function() {
    var parameters = $( '#filter_form' ).serializeArray();
    var names = {};
    var data = {};

    parameters.forEach(
        function( parameter ) {
            var name = parameter.name;
            var value = parameter.value;

            if(name in names) {
                name = names[name];
                if(name === 'species') {
                    if(value.indexOf('TAX_') !== 0) {
                        name = 'species_s';
                        if(!(name in data)) {
                            data[name] = [];
                        }
                    }
                }
                else if(name == 'disease') {
                    if(value.indexOf('DOID_') !== 0 && value.indexOf('JPO_') !== 0 ) {
                        name = 'disease_s';
                        if(!(name in data)) {
                            data[name] = [];
                        }
                    }
                }
                data[name].push(value);
            }
            else {
                names[name + "_value"] = value;
                data[value] = [];
            }
        }
    );

    data.project_keywords = $('#global_project_text').val();
    data.dataset_keywords = $('#global_dataset_text').val();
    data.protein_keywords = $('#global_protein_text').val();

    return data;
}

// adds filter
jpost.addFilter = function(type, value, text) {
    var parameters = $('#filter_form').serializeArray();
    var filter = jpost.getFilterParameters();
    var values = [];
    if(type in filter) {
        values = filter[type];
    }

    if(values.indexOf(value) >= 0) {
        return;
    }
    values.push(value);

    var flag = false;
    parameters.forEach(
        function(parameter) {
            var id = parameter.name;
            var item = parameter.value;

            if(item === type && !flag) {
                id = id.replace('filter', '');
                id = 'form_selection' + id + '_value';

                var option = new Option(text, value, true, true);
                $('#' + id).append(option).trigger('change');
                $('#' + id).trigger( 
                    {
                        type: 'select2:select',
                        params: {
                            data: values
                        }
                    }
                );
                flag = true;                
            }
        }
    );
}

// clear filters
jpost.clearFilters = function(type) {
    var parameters = $('#filter_form').serializeArray();
    var flag = false;
    parameters.forEach(
        function(parameter) {
            var id = parameter.name;
            var item = parameter.value;

            if(item === type && !flag) {
                id = id.replace('filter', '');
                id = 'form_selection' + id + '_value';

                $('#' + id).val(null).trigger('change');
                flag = true;                
            }
        }
    );    
}

// create protein table
jpost.createGlobalProteinTable = function(id, dataset) {
    table.createTable(
        id,
        {
            url: 'protein_table.php',
            columns: jpost.globalProteinColumns,
            parameters: function() {
                var params = jpost.getFilterParameters();
                if(dataset !== null) {
                    params.datasets = [dataset];
                }
                return params;
            },
            countClass: 'protein_table_tab_button',
            countUpdate: function(count) {
                return 'Protein (' + count + ')';
            }            
        },
        true
    );
}

// update global tablesq
jpost.updateGlobalTables = function(updateStanza = true) {
    $('.project_table_tab_button').html('Project');
    $('.dataset_table_tab_button').html('Dataset');
    $('.protein_table_tab_button').html('Protein');

    table.setPageNumber('projects', 1);
    table.updateTable('projects');
    
    table.setPageNumber('datasets', 1);
    table.updateTable('datasets');

    table.setPageNumber('proteins', 1);
    table.updateTable('proteins');

    if(updateStanza) {
        jpost.updatePieCharts();
    }
}

// update pie charts
jpost.updatePieCharts = function() {
    var parameters = {};
    jpost.setStanzaParameters( parameters );
     let updatePieChartStanzaParams = function(id){   
     var type = jpost.filterChartIds[ id ];
        var innerId = id + '_inner';
        jpost.filters.forEach(
            function( filter ) {
                [filter.name, filter.name + '_s'].forEach( 
                    function( item ) {
                        if( item in parameters) {
                            $('#' + innerId).attr(item, parameters[item]);    
                        }
                        else {
                            $('#' + innerId).removeAttr(item);
                        }
                    }
                );
            }
        );
        $('#' + innerId).attr('type', type);
     };
     for(id in jpost.filterChartIds) {
        let num = id.match(/(\d+)/)[1];
        setTimeout( updatePieChartStanzaParams, num * 500, id);
     }
}

jpost.setPieChartFilter = function() {
    var filter = jpost.getFilterParameters();
    if( filter.species === null || filter.species.length === 0 ) {
        $('.pie_chart').removeAttr('species');
    }
    else {
        var species = filter.species.join(',');
        $('.pie_chart').attr('species',  species);
    }
}

// open global dataset
jpost.openGlobalDataset = function(dataset) {
    var url = 'dataset_detail.php?id=' + dataset;
    $('#sub_search_panel').load(url);
    $('#main_search_panel').css('display', 'none');
    $('#sub_search_panel').css('display', 'block');
}

// open global protein
jpost.openGlobalProtein = function(protein) {
    var url = 'protein_detail.php?id=' + protein;
    $('#sub_search_panel').load(url);
    $('#main_search_panel').css('display', 'none');
    $('#sub_search_panel').css('display', 'block');    
}

// open global protein
jpost.openGlobalPeptide = function(peptide) {
    var url = 'peptide_detail.php?id=' + peptide;
    $('#sub_search_panel').load(url);
    $('#main_search_panel').css('display', 'none');
    $('#sub_search_panel').css('display', 'block');    
}

// create project dataset table
jpost.createProjectDatasetTable = function(id, project) {
    table.createTable(
        id,
        {
            url: 'project_datasets.php',
            columns: jpost.projectDatasetColumns,
            parameters: function() {
                return {id: project}
            },
            countClass: 'project_dataset_table_tab_button',
            countUpdate: function(count) {
                var string = 'Dataset';
                if(count > 1) {
                    string = string + '<br>(' + count + ' biological replicates)';
                }
                return string;
            }
        }
    );
}

// create dataset protein table
jpost.createDatasetProteinTable = function(id, dataset) {
    table.createTable(
        id,
        {
            url: 'protein_table.php',
            columns: jpost.globalProteinColumns,
            parameters: function() {
                return {datasets: [dataset]};
            },
            countClass: 'dataset_protein_table_tab_button',
            countUpdate: function(count) {
                return 'Protein (' + count + ')';
            }
        },
        true
    );
}

// create dataset peptide table
jpost.createDatasetPeptideTable = function(id, dataset) {
    table.createTable(
        id,
        {
            url: 'peptide_table.php',
            columns: jpost.globalPeptideColumns,
            parameters: function() {
                return {datasets: [dataset]};
            },
            countClass: 'peptide_table_tab_button',
            countUpdate: function(count) {
                return 'Peptide (' + count + ')';
            }
        },
        true
    );
}


// create protein peptide table
jpost.createProteinPeptideTable = function(id, protein) {
    table.createTable(
        id,
        {
            url: 'peptide_table.php',
            columns: jpost.globalPeptideColumns,
            parameters: function() {
                var data = {proteins: [protein]};
                if( jpost.slice != null ) {
                    data['datasets'] = jpost.slice.datasets;
                }
                return data;
            },
            countClass: 'peptide_table_tab_button',
            countUpdate: function(count) {
                return 'Peptide (' + count + ')';
            }
        },
        true
    );
}

// create protein peptide table
jpost.createProteinPsmTable = function(id, protein) {
    table.createTable(
        id,
        {
            url: 'psm_table.php',
            columns: jpost.globalPsmColumns,
            parameters: function() {
                var data = {proteins: [protein]};
                if(jpost.slice != null) {
                    data['datasets'] = jpost.slice.datasets;
                }
                return data;                
            },
            countClass: 'psm_table_tab_button',
            countUpdate: function(count) {
                return 'PSM (' + count + ')';
            }
        },
        true
    );
}

// create peptide psm table
jpost.createPeptidePsmTable = function(id, peptide, sequence, tax) {
    if(sequence != null) {
        jpost.createPsmTableFromSequence(id, sequence, tax);
    }
    else {
	    jpost.createPsmTableFromPeptideId(id, peptide);
    }
}

// create PSM table from pepID
jpost.createPsmTableFromPeptideId = function(id, peptide) {
    table.createTable(
        id,
        {
            url: 'psm_table.php',
            columns: jpost.globalPsmColumns,
            parameters: function() {
                var data = {peptides: peptide};
                if( jpost.slice != null ) {
                    data['datasets'] = jpost.slice.datasets;
                }
                return data;                
            },
            countClass: 'psm_table_tab_button',
            countUpdate: function(count) {
                return 'PSM (' + count + ')';
            }
        },
        true
    );
}

// create PSM table from sequnce
jpost.createPsmTableFromSequence = function(id, sequence, tax) {
    table.createTable(
        id,
        {
            url: 'psm_table.php',
            columns: jpost.globalPsmColumns,
            parameters: function() {
                var data = {peptides: sequence};
                if(tax != null) {
                    data['tax'] = tax;
                }
                if(jpost.slice != null) {
                    data['datasets'] = jpost.slice.datasets;
                }
                return data;                
            },
            countClass: 'psm_table_tab_button',
            countUpdate: function(count) {
                return 'PSM (' + count + ')';
            }
        },
        true
    );
}

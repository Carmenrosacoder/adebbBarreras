
<!DOCTYPE html>
<html>
	<head>
		<title>Buscar Barreras</title>
		<meta charset="UTF-8">
	</head>
	<body>
		<h1>Busca Barreras:</h1>
		<div id="dvFiltrosTexto">
			<input type="text" id="txtBuscador" placeholder="Escribe aquí lo que estas buscando..." />
		</div>
		<div id="dvFiltrosCombo">
			<label>Año:</label>
			<select id="cboAnio"></select>
			<label>Mes:</label>
			<select id="cboMes"></select>
			<label>Sector:</label>
			<select id="cboSector"></select>
			<label>Entidad:</label>
			<select id="cboEntidad"></select>
		</div>
		<div id="dvBloquePHP">
			<?php
				require 'PHPExcel\Classes\PHPExcel\IOFactory.php';
				$nombreArchivo = 'Documentos\Datos\Listado de Barreras Burocráticas.xlsx';
				$objPHPExcel = PHPExcel_IOFactory::load($nombreArchivo);
				$sheetCount = $objPHPExcel->getSheetCount();
				$columnName = $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
				$columnIndex = PHPExcel_Cell::columnIndexFromString($columnName);
				$listaTotal = '';
				$listaAños = array();
				$listaMeses = array();
				$listaSectores = array();
				$listaDenunciadas = array();

				for ($i = 0; $i < $sheetCount; $i++){
					$numRows = $objPHPExcel->setActiveSheetIndex($i)->getHighestRow();
					for ($j = 2; $j <= $numRows; $j++){
						$letraFinal = 'A';
						for ($z = 1; $z < $columnIndex; $z++){
							$listaTotal .= $objPHPExcel->getActiveSheet()->getCell($letraFinal .$j)->getCalculatedValue();
							$listaTotal .= '|';
							if($z == 1)
								$listaAños[] = $objPHPExcel->getActiveSheet()->getCell('A' .$j)->getCalculatedValue();
							elseif ($z == 2)
								$listaMeses[] = $objPHPExcel->getActiveSheet()->getCell('B' .$j)->getCalculatedValue();
							elseif ($z == 10)
								$listaSectores[] = $objPHPExcel->getActiveSheet()->getCell('J' .$j)->getCalculatedValue();
							elseif ($z == 4) 
								$listaDenunciadas[] = $objPHPExcel->getActiveSheet()->getCell('E' .$j)->getCalculatedValue();
							$letraFinal++;
						}
						$listaTotal = substr($listaTotal, 0, -1);
						$listaTotal .= 'ß';
					}
				}
				$listaTotal = substr($listaTotal, 0, -1);

				$aniosTotales = count($listaAños);
				$aniosUnicos = array_unique($listaAños);
				$aniosFinal = '';
				for ($i=0; $i < $aniosTotales; $i++) { 
					if(isset($aniosUnicos[$i]) == true){
						$aniosFinal .= $i;
						$aniosFinal .= '¬';
						$aniosFinal .= $aniosUnicos[$i];
						$aniosFinal .= '|';
					}
				}
				$aniosFinal = substr($aniosFinal, 0, -1);

				$mesesTotales = count($listaMeses);
				$mesesUnicos = array_unique($listaMeses);
				$mesesFinal = '';
				for ($i=0; $i < $mesesTotales; $i++) { 
					if(isset($mesesUnicos[$i]) == true){
						$mesesFinal .= $i;
						$mesesFinal .= '¬';
						$mesesFinal .= $mesesUnicos[$i];
						$mesesFinal .= '|';
					}
				}
				$mesesFinal = substr($mesesFinal, 0, -1);

				$sectoresTotales = count($listaSectores);
				$sectoresUnicos = array_unique($listaSectores);
				$sectoresFinal = '';
				for ($i=0; $i < $sectoresTotales; $i++) { 
					if(isset($sectoresUnicos[$i]) == true){
						$sectoresFinal .= $i;
						$sectoresFinal .= '¬';
						$sectoresFinal .= $sectoresUnicos[$i];
						$sectoresFinal .= '|';
					}
				}
				$sectoresFinal = substr($sectoresFinal, 0, -1);

				$denunciadasTotales = count($listaDenunciadas);
				$denunciadasUnicos = array_unique($listaDenunciadas);
				$denunciadasFinal = '';
				for ($i=0; $i < $denunciadasTotales; $i++) { 
					if(isset($denunciadasUnicos[$i]) == true){
						$denunciadasFinal .= $i;
						$denunciadasFinal .= '¬';
						$denunciadasFinal .= $denunciadasUnicos[$i];
						$denunciadasFinal .= '|';
					}
				}
				$denunciadasFinal = substr($denunciadasFinal, 0, -1);

				echo "<span id='spnListaTotal' hidden='hidden'>$listaTotal</span>";
				echo "<span id='spnListaAnios' hidden='hidden'>$aniosFinal</span>";
				echo "<span id='spnListaMeses' hidden='hidden'>$mesesFinal</span>";
				echo "<span id='spnListaSectores' hidden='hidden'>$sectoresFinal</span>";
				echo "<span id='spnListaDenunciadas' hidden='hidden'>$denunciadasFinal</span>";
			?>
		</div>
		<div id="dvControles">
			<input type="button" value="BUSCAR" id="btnBuscar" />
		</div>
		<div id="divCantidadResultados"></div>
		<br />
		<div id="divResultados"></div>
		<div id="divPaginacion"></div>
	</body>
	<script src="Documentos\JavaScript\Rutinas.js" type="text/javascript"></script>
</html>	
